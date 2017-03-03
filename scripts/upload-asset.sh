#!/usr/bin/env bash

# TODO: watch filesystem, upload multiple files/folder at once, upload to multiple asset_ids from one source file (if required?)
# TODO: re-pull the SQ_CSRF_TOKEN if it changes?  Report this -- detect the "invalid" message
# TODO: recache, open in browser
# TODO: handle lock acquisition via HIPO (eg Design files)

# USAGE
#
# This script requires Backend User access.  It will not work for Simple Edit users.
# Create a .env file in your matrix-helpers/ folder with the contents like:
# export SQ_SYSTEM_SESSION=
# export SQ_CSRF_TOKEN=
# You need to login to Squiz and retrieve your SQ_SYSTEM_SESSION cookie (we
# can't get it any other way) and get your SQ_CSRF_TOKEN via
# `https://www.jcu.edu.au/_admin/?SQ_ACTION=getToken`

# Start the timer
start=$SECONDS
counter=0

METADATA_ASSET_ID_ATTRIBUTE='asset_id'     # The key in the .yml for the asset ID
METADATA_TYPE_ATTRIBUTE='type'             # The key in the .yml for the upload type
METADATA_TYPE_DEFAULT='content'            # What we default to if the .yml file doesn't have a `type`

base_url=$MATRIX_BASE_URL
[ -z "$base_url" ] && base_url="https://www.jcu.edu.au/_admin"

function display_help {
  echo "Usage: upload_asset.sh FILE_PATH [FILE_PATH] ..."
  echo "This script updates the contents of all file paths given to a given "
  echo "Squiz Matrix instance."
  echo ""
  echo "We look for the corresponding asset IDs via a YAML file"
  echo "with the same name (plus '.yml') as the file.  For instance"
  echo "'content.html.yml' corresponds to a file named 'content.html'."
}

function echo_error {
  echo -e "\e[31m✘\e[39m  $1"
}

function echo_success {
  echo -e "\e[32m✔︎\e[39m  $1"
}

if [ "$1" == "--help" ]; then
  display_help
  exit 0
fi

if [ -z "$1" ]; then
  display_help
  exit 1
fi

if [ -z "$SQ_CSRF_TOKEN" ] || [ -z "$SQ_SYSTEM_SESSION" ]; then
  echo "No security data found. Set \$SQ_CSRF_TOKEN and \$SQ_SYSTEM_SESSION. Exiting."
  exit 1
fi

for file in "${@:1}"; do

  echo "Processing $file:"

  if ! [ -f "$file" ]; then
    echo_error "File not found: $file"
    echo
    continue
  fi

  # Test that an asset ID can be found in the associated metadata file
  metadata_file="$file.yml"
  if [ -f "$metadata_file" ]; then
    asset_id=$(shyaml get-value "$METADATA_ASSET_ID_ATTRIBUTE" < "$metadata_file")

    if [ -z "$asset_id" ]; then
      echo_error "asset_id key is missing from $metadata_file"
      continue
    fi
  else
    echo_error "No metadata file found; create one at $metadata_file"
    echo
    continue
  fi

  asset_type=$(shyaml get-value "$METADATA_TYPE_ATTRIBUTE" "$METADATA_TYPE_DEFAULT" < "$metadata_file")

  if [ "$asset_type" == "$METADATA_TYPE_DEFAULT" ]; then
    screen_type='contents'      # Which screen to load (inspect the frame URL)
    lock_type='content'         # Type of Matrix locks to acquire (inspect the POST request)
    field_type='textarea'     # Where to get the field name to upload (inspect the frame's HTML)
  elif [ "$asset_type" == "text_file" ]; then
    screen_type='edit_file'
    lock_type='attributes'
    field_type='textarea'
  elif [ "$asset_type" == "design" ]; then
    # TODO: not working because of HIPO jobs being invoked; need a workaround
    screen_type='parse_file'
    lock_type='parsing'
    field_type="textarea"
  elif [ "$asset_type" == "file" ]; then
    # TODO: File uploads not working yet
    screen_type='details'
    lock_type='attr_links'
    field_type="input_file"
  fi

  # Create temporary file for data storage
  tmpfile=$(mktemp)

  # Backend administrator URL
  matrix_url="$base_url/?SQ_BACKEND_PAGE=main&backend_section=am&am_section=edit_asset&assetid=$asset_id&asset_ei_screen=$screen_type"

  # Acquire locks
  curl "$matrix_url" \
      --silent \
      --cookie "SQ_SYSTEM_SESSION=$SQ_SYSTEM_SESSION" \
      --form "token=$SQ_CSRF_TOKEN" \
      --form "process_form=1" \
      --form "am_form_submitted=1" \
      --form "backend_assetid=$asset_id" \
      --form "asset_action=edit" \
      --form "sq_lock_acquire=1" \
      --form "sq_lock_acquire_by_force=0" \
      --form "sq_lock_type=$lock_type" > "$tmpfile"

  # Test to ensure that the locks are ours
  if grep -q 'to release the locks you hold on' "$tmpfile"; then
    echo_success "Successfully acquired locks for asset $asset_id."
  else
    echo_error "Lock acquisition failed for asset $asset_id."
    lock_debug=$(grep 'Held by user' "$tmpfile" | head -n 1 | cut -d "<" -f 1 | xargs)
    if [ -z "$lock_debug" ]; then
      echo -e "   \e[31m⁈\e[39m $lock_debug"
    fi
    echo
    continue
  fi

  # Get the field name from the HTML:
  #   <textarea name="bodycopy_div_393564_content_type_raw_html_864657_html"  [...]
  #   <textarea name="js_file_391595_new_file"  [...]
  if [ "$field_type" == "textarea" ]; then
    fieldname=$(grep -o -E '<textarea name=".*?"' "$tmpfile" | cut -d '"' -f 2)
  elif [ "$field_type" == "input_file" ]; then
    fieldname=$(grep -o -E '<input type="file" name=".*?"' "$tmpfile" | cut -d '"' -f 4)
  fi

  if [ -z "$fieldname" ]; then
    echo_error "Could not locate a suitable field for asset $asset_id; check the YAML file or else this asset type isn't supported."
    continue
  fi

  # Send content in different manners depending on field type
  if [ "$field_type" == "textarea" ]; then
    response=$(curl "$matrix_url" \
      --silent \
      --cookie "SQ_SYSTEM_SESSION=$SQ_SYSTEM_SESSION" \
      --form "token=$SQ_CSRF_TOKEN" \
      --form "process_form=1" \
      --form "am_form_submitted=1" \
      --form "backend_assetid=$asset_id" \
      --form "asset_action=edit" \
      --form "$fieldname=<$file" \
      --output /dev/null \
      --write-out "%{http_code}")
  elif [ "$field_type" == "input_file" ]; then
    filename=$(basename "$file")
    response=$(curl "$matrix_url" \
      --silent \
      --cookie "SQ_SYSTEM_SESSION=$SQ_SYSTEM_SESSION" \
      --form "token=$SQ_CSRF_TOKEN" \
      --form "process_form=1" \
      --form "am_form_submitted=1" \
      --form "backend_assetid=$asset_id" \
      --form "asset_action=edit" \
      --form "$fieldname=@\"$file\"; filename=\"$filename\"" \
      --output /dev/null \
      --write-out "%{http_code}")
  fi

  # Test to ensure that the content saved correctly
  if [ "$response" -eq 200 ]; then
    echo_success "Successfully uploaded content to asset $asset_id."
  else
    echo_error "Content upload failed for asset $asset_id. ($response)"
    continue
  fi

  # Release locks
  curl "$matrix_url" \
    --silent \
    --cookie "SQ_SYSTEM_SESSION=$SQ_SYSTEM_SESSION" \
    --form "token=$SQ_CSRF_TOKEN" \
    --form "process_form=1" \
    --form "am_form_submitted=1" \
    --form "backend_assetid=$asset_id" \
    --form "asset_action=edit" \
    --form "sq_lock_release_manual=1" \
    --form "sq_lock_type=$lock_type" > "$tmpfile"

  # Test to ensure that the locks were released
  if grep -q 'button to lock' "$tmpfile"; then
    echo_success "Successfully released locks for asset $asset_id."
  else
    echo_success "Lock release failed for asset $asset_id."
    continue
  fi

  # Cleanup temp file
  rm -f "$tmpfile"

  # Newline
  echo

  # Increase counter
  counter=$(( counter + 1 ))
done

if [ "$counter" -gt 0 ]; then
  # At least 54 seconds per upload
  script_duration=$(( SECONDS - start ))
  copy_paste_duration=$(( counter * 54 ))
  seconds_diff=$(( copy_paste_duration - script_duration ))
  percent_diff=$(( (copy_paste_duration / script_duration - 1) * 100 ))
  echo "💖  You just saved $seconds_diff""s ($percent_diff""% faster) versus copy & paste! 💖"
fi
