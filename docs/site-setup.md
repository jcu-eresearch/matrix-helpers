
# JCU Web Framework Integration with Matrix

## Setting up a new site

### Pre-check

Firstly, the information you'll need to know are:

* **Site URL:** the proposed URL of the new site, such as
  `www.jcu.edu.au/orpheus-island`.

  > The path should be all lowercase and only use hyphens as separators.
  > Domains other than `www.jcu.edu.au` can be used, but they're quite
  > complicated to configure.

* **Site Name:** the full name of the site, such as `Orpheus Island Research
  Station`.

  > You don't need usually want to mention `JCU` in this name as it
  > will automatically be mentioned.

Sites **must** be created as a child of the `Australia` > `JCU Web Framework
Sites` parent asset for the purposes of Content Container Template (CCT)
segregation and metadata schema application.  This process may be adjusted in
future if the rest of JCU's sites adopts our CCTs.

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
release of locks through this setup process.  Assuming you complete this
process quickly, you'll only need locks on the Site asset one time.</div>

1. Login to the Matrix Admin interface by loading
   <https://www.jcu.edu.au/web-framework/_login> and then visiting
   <https://www.jcu.edu.au/web-framework/_admin>.

1. Right-click on `JCU Web Framework Sites` > `New Child` > `Web` > `Site` to
   create the new `Site` asset.

    a. Set the `Site Name` to the full textual name of the site; this shows up in
       the site's `<title>` and various other areas, such as contact emails.
    a. Set the  `Link Type` choose `TYPE_2` (don’t show in navigation).
    a. Click `Commit`.

1. **Set your Site URL:** right-click on your site and go to `URLs`.

   a. Enter the proposed URL for the site and tick `HTTPS-only`.
   a. Click `Commit`.

1. Right-click on your site and go to `Metadata Schemas` and do the following:

   a. Confirm that `Asset Settings` and `JCU Web Framework Site Settings` are
      present. These **must** be applied to every asset, the `Site` included,
      so we try and detect if these aren't available and alert the user on the
      frontend.  If these aren't present on the `Site`, you must add them;
      refer to an existing site to check best-practice setup.

   a. Change `JCU Web Framework Site Settings` > `Cascade` to being unchecked.

   a. Click `Commit`.

1. **Set the Paint Layout:** Right-click the site and go to `Paint Layouts`.
   Within `Effective Paint Layouts` > `Paint Layout` choose the asset located
   at: `JCU Web Framework Resources` > `Paint Layouts` > `Default Paint Layout`.

   Click `Commit`.

1. **Set the Design: Right-click** the site and go to `Settings`.  In
   `System Defined Frontend Design` > `New?`, choose the overarching design
   you wish to apply to your site.  The options are:

   * `JCU Web Framework Resources` > `Designs` > `JCU Explore` > `JCU
      Explore - Defaults`.

   Take care here; the asset you are selecting must be complete design (which
   is *typically* a filled Design Customisation).

   **Optional:** if testing the system or wanting an easier way to test
   keywords, enable the Test Environment.  Under `Create New User Defined
   Design`, enter `test` as the `Design Code`, and in `New?`, choose the asset
   at:

   * `JCU Web Framework Resources` > `Designs` > `Test
     Environment` > `Test Environment - Defaults`

1. **Grant permissions to other users:** if you know the identities of users
   or groups that should have edit access to this site, set them now via
   right-clicking on your site and choosing `Site` > `Permissions`.  You
   should assign `Read`, `Write` and `Admin` permissions to your editors - the
   ability to `Admin` is necessary to publish content and, in general, change
   the `Status` of content.  You can also do this later, but take care to
   cascade permissions to any child assets you're about to create.

1. **Create the empty homepage**: right-click the site > `New Child` > `Pages` >
   `Standard Page` and name it `Home` (by convention) and set its link type to
   `LINK_2` (so it won't be shown in navigation).

    a. Set the `Home` page to be a *landing* page via right-clicking the `Home`
       asset and going to `Metadata` > `Theme` > `Landing Theme`.

    a. **Optional:** enable animations on the `Home` page via right-clicking
       the `Home` asset and going to `Metadata` > `Animations` > `Enable`.

1. **Link the 404 page to the site:** locate the common `404 Not Found` page
   at `Common` > `Content` > `404 Not Found`.  Drag this into the new site and
   choose `Link` to re-use the 404 page or `Clone`, if you want a custom 404
   page.  Accept any permission changes in `HIPO` by clicking `Next`.

   The 404 page must be linked in this way due to how Matrix looks up the
   "site" associated with this type of page.  If we were to use the common
   asset directly, the 404 page would have generic branding, not specifics
   (such as the Orpheus Island logo, background and co-branding).

1. **Configure site for index and 404 pages**: right-click on the site and
   choose `Details`.

   a. For `Index`, select the `Home` page asset for this site.
   a. For `Not Found Page`, select the `404 Not Found` page for this site (the
   one located underneath this site).
   a. For `Archived Asset`, choose the `404 Not Found` page as well.
   a. Click `Commit`.

<div class="alert alert-success">
<strong>Congratulations!</strong> The basic site is now live. You can now see
your work by right-clicking the site and choosing <code>Preview</code> >
<code>In New Window</code> - or just by manually typing the URL in.
</div>

Adding and editing content is now possible using the `Page Tools` menu on
the front end (the blue menu at top-left).  Edit+ editing is preferred, even
for `Backend Users` over the admin interface because of the various plugins
developed to help support editors.

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

Also remember that if you want to clone a `Site` **and** its contents, you'll
have to clone in two stages: clone the `Site`, then clone its contents under
the copy of the `Site`.
