# Designs

## Explore

The Explore layout (`explore.html`) is designed to allow visitors to
experience and engage with one specific topic area.  Originally, this was a
specific remote research station, showcasing things the user has likely never
seen and encouraging them to learn more, to discover, and to *explore*.  The
visual layout is striking, with large cover images and fonts used throughout,
animations on home pages and cohesive branding across a site.

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
