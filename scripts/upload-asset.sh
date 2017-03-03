#!/usr/bin/env bash

# TODO: watch filesystem, upload multiple files/folder at once, upload to multiple asset_ids from one source file (if required?)
# TODO: re-pull the SQ_CSRF_TOKEN if it changes?  Report this -- detect the "invalid" message

# USAGE
#
# This script requires Backend User access.  It will not work for Simple Edit users.
# Create a .env file in your matrix-helpers/ folder with the contents like:
# export SQ_SYSTEM_SESSION=
# export SQ_CSRF_TOKEN=
# You need to login to Squiz and retrieve your SQ_SYSTEM_SESSION cookie (we
# can't get it any other way) and get your SQ_CSRF_TOKEN via
# `https://www.jcu.edu.au/_admin/?SQ_ACTION=getToken`

METADATA_ASSET_ID_ATTRIBUTE='asset_id'
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

  if [ -f "$file" ]; then
    upload_file="$file"
  else
    echo
    echo_error "File not found: $file"
    echo
    continue
  fi

  # Test that an asset ID can be found in the associated metadata file
  metadata_file="$upload_file.yml"
  if [ -f "$metadata_file" ]; then
    asset_id=$(shyaml get-value "$METADATA_ASSET_ID_ATTRIBUTE" < "$metadata_file")
  else
    echo
    echo_error "No metadata file found; create one at $metadata_file"
    echo
    continue
  fi

  echo "Processing $file:"

  # Create temporary file for data storage
  tmpfile=$(mktemp)

  # Backend administrator URL
  matrix_url="$base_url/?SQ_BACKEND_PAGE=main&backend_section=am&am_section=edit_asset&assetid=$asset_id&asset_ei_screen=contents"

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
      --form "sq_lock_type=content" > "$tmpfile"

  # Test to ensure that the locks are ours
  if grep -q 'to release the locks you hold on' "$tmpfile"; then
      echo_success "Successfully acquired locks for asset $asset_id."
  else
      echo_error "Lock aquisition failed for asset $asset_id."
      exit 1
  fi

  # Get the field name from the HTML:
  #   <textarea name="bodycopy_div_393564_content_type_raw_html_864657_html"  [...]
  fieldname=$(grep -o -E 'name="bodycopy_div_.*?"' "$tmpfile" | cut -d '"' -f 2)

  # Send content
  response=$(curl "$matrix_url" \
      --silent \
      --cookie "SQ_SYSTEM_SESSION=$SQ_SYSTEM_SESSION" \
      --form "token=$SQ_CSRF_TOKEN" \
      --form "process_form=1" \
      --form "am_form_submitted=1" \
      --form "backend_assetid=$asset_id" \
      --form "asset_action=edit" \
      --form "$fieldname=<$upload_file" \
      --output /dev/null \
      --write-out "%{http_code}")

  # Test to ensure that the content saved correctly
  if [ "$response" -eq 200 ]; then
      echo_success "Successfully uploaded content to asset $asset_id."
  else
      echo_error "Content upload failed for asset $asset_id. ($response)"
      exit 1
  fi

  # Release locks
  curl "$matrix_url" \
      --silent \
      --cookie "SQ_SYSTEM_SESSION=$SQ_SYSTEM_SESSION" \
      --form "token=$SQ_CSRF_TOKEN" \
      --form "process_form=1" \
      --form "am_form_submitted=1" \
      --form "backend_assetid=393564" \
      --form "asset_action=edit" \
      --form "sq_lock_release_manual=1" \
      --form "sq_lock_type=content" > "$tmpfile"

  # Test to ensure that the locks were released
  if grep -q 'button to lock' "$tmpfile"; then
      echo_success "Successfully released locks for asset $asset_id."
  else
      echo_success "Lock release failed for asset $asset_id."
      exit 1
  fi

  # Cleanup temp file
  rm -f "$tmpfile"
done
