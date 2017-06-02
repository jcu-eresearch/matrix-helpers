
# JCU Web Framework Integration with Matrix

## Setting up a new site

### Pre-check

Firstly, the information you'll need to know are:

* **Site URL:** the proposed URL of the new site, such as
  `www.jcu.edu.au/orpheus-island`.

  > The path should be all lowercase and only use hyphens as separators.
  > This should be something short but meaningful.  Acryonyms can be used
  > but keep in mind that they can negatively affect search rankings.
  >
  > Domains other than `www.jcu.edu.au` can be used, but they're quite
  > complicated to configure.

* **Site Name:** the full name of the site, such as `Orpheus Island Research
  Station`.

  > You don't need usually want to mention `James Cook University` or `JCU` in
  > this name as it will automatically be included in areas like the page
  > title.

* **Access details:** the individual names or organisation units of people who
  should have access to edit your site.

  > It's reasonably straightforward to add more people later, but it will
  > involve asking your System Administrator to do this for you.
  >
  > You will need to know the Matrix asset IDs of each user/group who should
  > have permission; this might require asking your System Administrator
  > before proceeding.

Sites **must** be created as a child of the `Australia` > `JCU Web Framework
Sites` parent asset for the purposes of Content Container Template (CCT)
segregation and metadata schema application.  This process may be adjusted in
future if the rest of JCU and its sites adopt our CCTs.

You'll need permission to login to the Matrix Admin interface as a `Backend
Editor` with suitable permission to create a Site asset.  The following steps
must be completed in this order to ensure the correct application of metadata
schemas, but it only needs to be done once.

Finally, there are **lot** of resources that are designed to be shared between
Sites, CCTs, Designs and other assets.  Care should be taken to ensure you are
not locking, editing, or worst, **deleting** a shared or multiply-linked
asset.  If in doubt, please ask.

### Process

<div class="alert alert-warning">Note that we don't repeat the acquisition or
release of locks through this setup process. You will need to acquire locks
before each action and release locks afterwards.</div>

1. Login to the Matrix Admin interface by loading
   <https://www.jcu.edu.au/web-framework/_login> and then visiting
   <https://www.jcu.edu.au/web-framework/_admin>.

1. **Create the Site:** Right-click on `JCU Web Framework Sites` > `New
   Child` > `Web` > `Site` to create the new `Site` asset.

    1. Set the `Site Name` to the full textual name of the site; this shows up in
       the site's `<title>` and various other areas, such as contact emails.

    1. Set the  `Link Type` choose `TYPE_2` (don’t show in navigation).

    1. Click `Commit`.

1. **Set your Site URL:** right-click on your site and go to `URLs`.

   1. Enter the proposed URL for the site and tick `HTTPS-only`.

   1. Click `Commit`.

1. **Configure Metadata Schemas**: right-click on your site and go to
   `Metadata Schemas` and do the following:

   1. Confirm that `Asset Settings`, `JCU Web Framework Site Settings` and `Summary Card` are
      present. These **must** be applied to every asset, the `Site` included,
      so we try and detect if these aren't available and alert the user on the
      frontend.  If these aren't present on the `Site`, you must add them;
      refer to an existing site to check best-practice setup.
      
   1. Confirm `Asset Settings` > `Cascade` is **checked**. This is **critically**
      important to ensure content is configured correctly.

   1. Change `JCU Web Framework Site Settings` > `Cascade` to being **unchecked**. This
      is **critically** important to ensure the correct metadata schemas are applied
      to all future content in this site.  If you miss this point, you'll have to
      manually fix this later.
      
   1. Confirm `Summary Card` > `Cascade` is **checked**. This is important to ensure content is configured correctly and the Summary Cards content container can be used within the site.

   1. Click `Commit`.

1. **Set the Paint Layout:** right-click the site and go to `Paint Layouts`.

   1. Within `Effective Paint Layouts` > `Paint Layout` choose the asset located
      at: `JCU Web Framework Resources` > `Paint Layouts` > `Default Paint Layout`.

   1. Click `Commit`.

1. **Set the Designs:** right-click the site and go to `Settings` and set
   each of the following:

   1. In `System Defined Frontend Design` > `New?`, choose the overarching design
      you wish to apply to your site.  The options are:

      * `JCU Web Framework Resources` > `Designs` > `JCU Explore` > `JCU
        Explore - Defaults`.

      Take care here; the asset you are selecting must be the complete design
      (which is *typically* a filled Design Customisation).

   1. In `System Defined Login Design` > `New?`, choose the standard login
      page for Web Framework sites, located under `JCU Web Framework
      Resources` > `Designs` > `JCU Login` > `JCU Login - Defaults`.

      Take care here; the asset you are selecting must be the complete design
      (which is *typically* a filled Design Customisation).

   **Optional:** if testing the system or wanting an easier way to test
   keywords, enable the Test Environment.  Under `Create New User Defined
   Design`, enter `test` as the `Design Code`, and in `New?`, choose the asset
   at:

   * `JCU Web Framework Resources` > `Designs` > `Test
     Environment` > `Test Environment - Defaults`

1. **Remove the default workflow:** because we're not using JCU's workflow, we
   need to remove it or it'll cause problems later when users try and publish
   content.  This step may or may not be required, depending on where you are
   creating your new site as Matrix causes workflows to automatically inherit.

   1. Right-click on your Site and choose `Workflow`.

   1. Check the box next to `Delete?` for `Australia Workflow` and click
      `Commit`.

   This will change the Site asset.  If you have happened to have forgotten
   this step and need to do this later, ensure you cascade this change to all
   children, which is the default setting.

1. **Grant permissions to other users:** if you know the identities of users
   or groups that should have edit access to this site, set them now via
   right-clicking on your site and choosing `Permissions`.  You
   should assign `Read`, `Write` and `Admin` permissions to your editors - the
   ability to `Admin` is necessary to publish content and, in general, change
   the `Status` of content.  You can also do this later, but take care to
   cascade permissions to any child assets you're about to create.

1. **Create the empty homepage**: right-click the site > `New Child` > `Pages` >
   `Standard Page` and name it `Home` (by convention) and set its link type to
   `LINK_2` (so it won't be shown in navigation).

    1. Set the `Home` page to be a *landing* page via right-clicking the `Home`
       asset and going to `Metadata` > `Theme` > `Landing Theme` (disabling
       `Use default` in the process).

    1. **Optional:** enable animations on the `Home` page via right-clicking
       the `Home` asset and going to `Metadata` > `Enable Animations` >
       `Enabled` (disabling `Use default` in the process).

1. **Link the 404 page to the site:** locate the common `404 Not Found` page
   at `JCU Web Framework Sites` > `Common Content` > `404 Not Found`.
   Drag this into the new site and choose `Link` to re-use the 404 page or
   `Clone`, if you want a custom 404 page.  Accept any permission changes in
   `HIPO` by clicking `Next`.

   The 404 page must be linked in this way due to how Matrix looks up the
   "site" associated with this type of page.  If we were to use the common
   asset directly, the 404 page would have generic branding, not specifics
   (such as the Orpheus Island logo, background and co-branding).

1. **Configure site for index and 404 pages**: right-click on the site and
   choose `Details`.

   1. For `Index`, select the `Home` page asset for this site.

   1. For `Not Found Page`, select the `404 Not Found` page for this site (the
      one located underneath this site).

   1. For `Archived Asset`, choose the `404 Not Found` page as well.

   1. Click `Commit`.

<div class="alert alert-success">
<strong>Congratulations!</strong> The basic site is now live. You can now see
your work by right-clicking the site and choosing <code>Preview</code> >
<code>In New Window</code> - or just by manually typing the URL in.
</div>

Adding and editing content is now possible using the `Page Tools` menu on
the front end (the blue menu at top-left).  Edit+ editing is preferred, even
for `Backend Users` over the admin interface because of the various plugins
developed to help support editors.

<div class="alert alert-warning">
<strong>Bug alert!</strong> If you've just logged in, you might not see the
blue Page Tools menu.  There's currently a caching issue that causes the wrong
version of the page to be shown.  Whilst our vendor fixes the problem, you
need to shift-refresh the site; this takes you to a workaround we have
developed.
</div>

Go forth and set the `Site`-level metadata to configure the site as a whole,
and start building pages.

## Cloning an existing site

It's possible to clone an existing site, but you'll have to take care to
relink and reconfigure the following settings:

* `Site` URL will need to be set correctly
* `Index`, `Not Found Page`, `Archived Asset` will point at the old site
* Any `Site`-level metadata will need to be changed (such as the logo)
* Permissions will need to be changed on all cloned assets
* The `404 Not Found` asset will need to be re-linked (unless you want a clone
  of the 404 page, in which case, you already have it)
* Any content that is using `Nest Content` Content Containers or other types
  of CCT that link to specific assets; for instance, the `Contact` page on the
  Research Infrastructure sites.

Also remember that if you want to clone a `Site` **and** its contents, you'll
have to clone in two stages: clone the `Site`, then clone its contents under
the copy of the `Site`.

Finally, there's also a bug with cloning content in Matrix.  What happens is
if you clone **any** content underneath a JCU Web Framework site (or really
anywhere in Matrix) with a non-cascading schema, that schema will get copied
onto cloned assets.  See more info at
<https://github.com/jcu-eresearch/matrix-helpers/issues/102>.
