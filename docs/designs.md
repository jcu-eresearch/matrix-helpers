# Designs

## Explore

The Explore layout (`explore.html`) is designed to allow visitors to
experience and engage with one specific topic area.  Originally, this was a
specific remote research station, showcasing things the user has likely never
seen and encouraging them to learn more, to discover, and to *explore*.  The
visual layout is striking, with large cover images and fonts used throughout,
animations on home pages and cohesive branding across a site.

### Features

* **Beautiful design:** everything is clean, simple and ready for your
  content. With *Explore*, we help your visitors focus on your facility, area,
  or project.
* **Fully responsive:** your pages automatically adapt to all screen sizes.
* **Page Tools menu:** *the* front-end interface for users.  Gives easy access
  to editing tools and administration access, access to hidden Matrix tools,
  access to customised tools, the ability for users determine if logged in,
  access to easily log out and inspect the current site and page.  Forget your
  secret URLs!
* **Content Block Templates:** everything is content blocks -- forget needing
  to use raw HTML for anything as a non-technical editor.  Admins can still
  jump in where need be, but as an editor, you can build beautiful-looking
  pages within minutes without any technical help.
* **No secret IDs**: forget what an asset ID is; editors can use the whole
  setup without entering in manual asset ID.  No need to remember secret
  codes.
* **Site settings:** background images, colours, Favicon, CSS, JS, co-branding
  footers, social media controls and more via centralised metadata
  configuration
* **Google Maps** automatic JS API inclusion when in use and central
  configuration via metadata configuration
* **Analytics:** ability for users to connect their own alternate Analytics
  profile and/or use JCU's standard profile
* **Edit+ Site Settings:** editors can configure certain aspects of Edit+ from
  their site settings, such as adding common folders or areas into the Asset
  Finder just for their site.
* **Edit+ plugins**: true CSS styling, preview windows, intuitive naming of
  controls, easy access to all Matrix assets, collapsible metadata sections,
  custom metadata fields (colour selector and icons), site editing access, URL
  editing access, JCU branding, optimisation for performance, easy-access
  toolbar buttons, URL-access shortcuts to new assets & asset finder, helpful
  warnings and more.
* **Extensible:**  if you're a developer, creating a new Content Block
  Template is easy with the tools already built and direct integration with
  Bootstrap's CSS and JS via the JCU Web Framework.
* **Debugging tools:** Matrix is a big black box -- you don't get errors if
  things break and it's hard to work with.  However, we don't settle. Want to
  build even more powerful add-ons for the system? Jump in to the SSJS
  Introspector and Test Environment for examining everything you need to know
  about the Matrix working environment.

#### Technical info

Many of the aspects of the layout rely on the JCU Web Framework, and thus in
turn, Boostrap.

Content Container Templates (CCTs) have been built to work on both landing
pages and content pages and will automatically adjust themselves.  For
instance, on content pages, their layout is thinner and they add a white
background, whereas on a landing page, the background is removed and they are
wider.

### Configuration

* Set `JCU.debug = true` in any area of SSJS on any page get debugging
  information outputted from SSJS as HTML comments

* Define an SSJS function anywhere with various prefixes to have it
  automatically run in the defined location:

  * `JCU_ssjs_NAME()` runs immediately after SSJS initialisation
  * `JCU_head_NAME()` runs immediately before `</head>`
  * `JCU_body_NAME()` runs immediately before `</body>`

  and replace `NAME` with a unique function identifier.  This (ab-)uses the
  nature of JavaScript's function hoisting together with the nature of SSJS to
  ignore the separation of `<script runat="server">` blocks and execute them
  altogether.  For note, if SSJS is disabled (and SSJS runs client-side), then
  any functions defined to run like this will only work *after* they've been
  defined; hoisting doesn't work across `<script>` tags in a browser.
