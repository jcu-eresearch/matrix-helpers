# What is The Matrix?

Here's a collection of resources to make your experience with Squiz Matrix easier,
especially for non-technical editors and make some form of development possible.
Overall, this project generally aims to shoehorn Matrix into an actual CMS.

## Getting started

First up, let's clone this stuff:

    git clone https://github.com/jcu-eresearch/matrix-helpers.git
    git clone https://github.com/jcu-eresearch/squiz-matrix.git

The former is this repo and the latter is the source code for Matrix itself.
Whilst billed as open source, it isn't quite that simple. This code was
extracted from a VM image and is quite out-of-date, but it is all we have at this
stage.

To get started, ensure you don't think about Matrix as a traditional CMS where
you're able to edit content and create sites out of the box.  It's
much more akin to a framework, like Django or Rails, except it is very limiting
and you don't have raw programming (eg PHP, Python or Ruby) at your disposal.
Matrix is very unopinionated about every aspect of either content management,
creation or configuration.  Expect you need to do effectively everything
yourself in terms of wiring: such as creating page templates, writing your own
listing display and logic (such as Folder listings), setting up fields of
metadata for users to input and connecting it all together.

So if you're coming from a technical background, it's better you think of
Matrix as a framework, with its own custom languages producing HTML output.
Under the hood, all pages are actually `eval`'d PHP so when you're writing
keywords or Designs, you're actually outputting PHP behind the scenes
that'll be executed for display.  For security reasons, you can't manipulate
that backend PHP directly, so implementing something has to be done in an
*approved* manner, with only the provided constructs, the behaviour of which may
or may not be clear or well documented.  Many things that don't appear possible
at first (such as "or" conditional blocks) can be achieved in nests, keywords,
workarounds or by rethinking and tweaking logic.

## About this repo

This repository contains a variety of helpers and documentation to make life a
little easier. Go exploring for now and eventually, there'll be a listing here
of the key bits of info.

You're welcome to use any or all of it. The licence is the Affero GPL 
(see LICENCE.txt), which means that the system you're using it
within needs to be compatibly licensed.

## More resources

Need even more help?  Try these locations.  Keep in mind that the
Matrix community is a niche so help on common platforms like
StackOverflow is unlikely.

* [Official manuals](https://matrix.squiz.net/) - the official
  documentation for Matrix, includes manuals, some tutorials and various
  examples.
  
* [Squiz forums](https://forums.squiz.net/) - the official forums for support
  questions and similar.

* [Matrix Users blog](http://matrixusers.com/) - a blog created by Ladoo, an
  Australian provider, last updated circa 2012.  Again, the screenshots are a
  touch out of date but the content still applies.  Of particular note:

  * [Matrix Secrets
    Revealed](http://matrixusers.com/news/matrix-secrets-revealed) - a freely
    available document describing the ins and outs of Matrix.  It was written in
    2009 so is somewhat out of date in terms of screenshots and technologies used,
    but the ideas are still relevant.  Also features a number of screencasts.

  * [Matrix Keywords Big
    List](http://matrixusers.com/tips/keywords-the-great-big-list) - large
    list of common keywords and Design/Parse code used in Matrix.  Still lacks
    the exact output of the keywords (as the official documentation does) so use
    in combination with official documentation and our official test Design in
    this repository.

## Helpful dumps

Check out `dumps/` for a variety of system dumps that will help you when
working with keywords in various different contexts. For instance, the
`asset-*` exports will assist with determine which attributes and keywords are
available on Page assets, Sites and so forth.
