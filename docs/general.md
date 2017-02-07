# General info

## Terminology

* **Frontend**: the rendered HTML output of a CMS page, as seen by an
  unauthenticated or unprivileged user.
* **Edit+**: the graphical interface for editing page content that most
  editors will be using. Features a WYSIWYG editor, asset map and other basic
  content-related tools. Typically accessed at `/_edit`.
* **EasyEdit**: former name for Edit+.
* **Backend**: administrative interface for system admins or technical staff.
  Consists of an large asset map and a technical UI for configuring all
  aspects of content.  Requires `Backend User` access. Typically accessed at
  `/_admin`.

## Login

You must log in via `/_login` or `/_edit` first to trigger single-sign on
(SSO/SAML) authentication before proceeding to any `/_admin` pages.

If you experience a blank SAML page (eg `/saml-au`), then perform a
shift-refresh on the page (clear your cache) and it should load correctly.

Note that failing to login three times will result in your user asset's status
being made `Under Construction` (thus preventing you from logging in). Contact
system administrators and ask this be resolved.

## Assets

Everything in Matrix is an Asset.  Pages are Assets, Sites are Assets, Users
and Groups are Assets, Designs are Assets, Metadata Fields within Metadata
Schemas are Assets and so forth.

### Link Types

Matrix has a generic set of link *types* that can be applied to all assets.
As this is an unopinionated group of settings, it's possible that your
behaviour may differ:

* `TYPE_1`: an asset is displayed in both the frontend and backend navigation,

* `TYPE_2`: links are only displayed in the backend navigation and not
  displayed on the rendered HTML frontend.

* `TYPE_3`: links have been referenced, but their purpose is unknown at this
  stage.

* `NOTICE`: not typically visible to edit users, this type of link indicates
  that something will be affected if the linked asset is deleted.  For
  instance, you'll see these appearing in CSS File Folders when linking CSS for
  minification.

### Permissions

The following are the types of permissions that can be granted to an Asset;
both users and groups can be granted permissions:

* *Read:* access/see the asset
* *Write:* edit the asset and create child assets under that asset
* *Admin:* perform status changes (eg make Live), apply or remove Metadata and
  Workflow schemas, test performance and more.

Keep in mind that just because you have a permission like `Admin` on an Asset
doesn't mean you can access its backend admin interface.  You'll also need to
be a `Backend User` to have that level of access.  The same goes for `Write`
permission as well -- if you're not a `Simple Edit User` (or a higher class of
user) then you won't be able to access the Edit+ UI.

### Inheritance

Inheritance of settings happens on creation of an Asset or, optionally, during
linkage of Assets under a new parent.  For instance, during creation of a
Page, any permissions set to `Cascade` will be copied from the parent objects
in that Asset's lineage and set on the new Asset.  The same applies for
Metadata and Metadata Schemas; if configured to `Cascade` the presence of a
schema or actual metadata will be copied.

Note that it's very possible for a child object to get out of sync with its
parents' permissions or metadata.  This behaviour is unlike other CMSes like
Plone or a standard file system on a computer which calculate permissions
dynamically.  Tread carefully.

#### Missing admin access?

Because assets are configured with permissions directly, in some cases missing
permissions have been observed during cloning/creation.  If this occurs, you
can potentially re-clone or recreate the original Asset to have the
permissions attempted again, or alternatively recreate an Asset under a
different folder (with correct permissions) and relink it in the desired spot.

If all else fails, contact the user with the root permission account and have
them fix this manually.

### Workflow

Changing the Status of an Asset requires Admin permission and/or control via
Workflow, if applied. Keep in mind that having admin access doesn't override
workflow, so you'll still need to keep in touch with your site admin if
workflow is applied.

Workflows operate using workflow schemas, much like metadata schemas, and can
be applied to a context of assets in the tree with admin permission.  Without
a workflow schema applied to an Asset, anyone with relevant admin permissions
can make assets Live, which reduces approval complexity.

### Metadata

Metadata is the core to actually being able to create solutions and program
within Matrix.  Essentially, metadata are arbitrary fields that are stored and
associated with an Asset by way of Metadata Schemas, a collection of prototype
fields and defaults.

From an editor's perspective, the metadata is configurable through the Edit
interface; an example might be a site logo or page background.  The effect of
changing a given metadata field is up to the site or system administrator in
how they've built the environment.  See the `development.md` document for more
on the technicalities of Metadata.

### Linking

Assets are initially created with one parent linkage, and have an ID which can
be linked in different areas of the tree. For instance, a page could be made
to appear at multiple URLs, or a user asset can be placed in multiple groups.

If multiple links exist, the Asset will appear in the tree multiple times and
have multiple canonical URLs, which isn't recommended for SEO.  It could,
however, be useful for making a copyright or legal statement appear on
multiple sites without duplicating the cotnent.

HIPO is used to create new links and requires a pop-up window to be allowed in
the browser.  You will be prompted to inherit parent permissions for any new
linkages created.

### Web Paths

Web paths are the URLs that content is accessible under, and is in ways
associated with the `Linking` settings.

If you're planning on changing the URL of your content, you should strongly
consider ensuring automatic redirections (301) are created by ensuring that
`Automatically add remaps` is enabled in the `Web Paths` area. It is possible
to use this technique to manipulate remaps without needing access to the Remap
Manager, which non-system admins don't have.

## Operation

* **504 Gateway Timeouts**: Occasionally, the backend interface will timeout.
  This is unfortunately expected behaviour so just wait a moment and
  re-perform whatever you were attempting.  If in the admin interface, you'll
  probably want to reload your page because it uses frames.

* Don't trust the URL in the address bar to determine what content you are
  modifying -- frames and iframes are used on the admin and edit pages.

* Occasionally, the Matrix system will become confused as to your permissions.
  You'll be allowed to perform certain actions (such as logging in and editing
  content), but not others (such as modifying remaps). Remove the
  `SQ_SYSTEM_SESSION` cookie from your browser and log in again.

## UI

* **Selecting related assets**: When the asset map goes purple, you can select
  assets using the context menu (for example, right click→ Use Me).

## System admin input

Because editors are restricted from accessing the *Backend* of Matrix,
contacting the system administrators will normally be required for:

* Changing content permissions
* Changing designs
* Adding or removing metadata schemas from an asset or site
* Setting or changing URLs for any content
* Configuring index, not found or achieved pages on Sites

The following are possible with workarounds or hacks and are awaiting input
from official sources:

* Setting Site metadata (users can't edit this when an index/homepage is set
  due to JavaScript redirection)

## Tasks

Matrix works by running tasks to perform any content management processes.
Popups are required and will keep appearing at set intervals.  You'll see this
in the `HIPO Herder` that keeps popping up everywhere.  Just get used to it
and make sure you don't navigate away  from the Herder whilst it is executing.
If you do, you'll find your job paused and the action you were taking won't
have yet completed.  If you need to access and resume the task, use the hippo
icon button in the top-right corner to manage broken asset processing jobs and
delete them (or resume them).

