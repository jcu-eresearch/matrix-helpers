
<style>
    h1 { padding: 1em 0; }
    h2 { padding: 2em 0 1em; }
    /* SVG diagrams */
    svg {
        fill: rgba(200,200,200, 0.25);
        stroke: #999;
        stroke-width: 0.3;
    }
    #sourcesvg {
        display: none;
    }
    #diag-bg {
        fill: rgba(255,255,255, 1);
        stroke: none;
    }
    svg.diag {
        display: inline-block;
        vertical-align: top;
        /*transform: rotate(-3deg);*/
        /*float: right;*/
        /*clear: right;*/
        width: 10em;
        /*width: 240px;*/
        margin: 0 0.5em 0.5em; 
    }
    svg use.highlight {
        fill: #ff9;
        fill: rgba(255,255,153, 0.9);
        stroke: #333;
        stroke-width: 0.6;
    }
</style>

<svg id="diags" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none">
    <defs>
        <symbol id="bg">
            <rect x="0" y="0" width="60" height="50" stroke="none" />
        </symbol>
        <symbol id="img-bg">
            <rect x="0" y="0" width="60" height="50" stroke="none" />
            <line x1="0" y1="0" x2="60" y2="50" stroke-width="100" stroke="white" stroke-dasharray="2,2" />
        </symbol>
        <symbol id="heading">
            <rect x="6" y="7" width="30" height="3" />
        </symbol>
        <symbol id="heading-and-sub">
            <rect x="6" y="7" width="30" height="3" />
            <rect x="6" y="11" width="20" height="2" />
        </symbol>
        <symbol id="text-med">
            <line x1="0" y1="1" x2="20" y2="1" />
            <line x1="0" y1="3" x2="6" y2="3" /><line x1="8" y1="3" x2="18" y2="3" />
            <line x1="0" y1="5" x2="19" y2="5" />
            <line x1="0" y1="7" x2="11" y2="7" /><line x1="13" y1="7" x2="20" y2="7" />
            <line x1="0" y1="9" x2="19" y2="9" />
        </symbol>
        <symbol id="text-wide">
            <use xlink:href="#text-med" x="6" y="1"></use>
            <use xlink:href="#text-med" x="15" y="1"></use>
            <use xlink:href="#text-med" x="33" y="1"></use>
        </symbol>
        <symbol id="pic-med">
            <rect x="1" y="1" width="23" height="15" />
            <line x1="3" y1="3" x2="22" y2="14" />
            <line x1="22" y1="3" x2="3" y2="14" />
        </symbol>
        <symbol id="pic-sml">
            <rect x="1" y="1" width="15" height="10" />
            <line x1="3" y1="3" x2="14" y2="9" />
            <line x1="14" y1="3" x2="3" y2="9" />
        </symbol>
        <symbol id="num">
            <rect x="2" y="1" width="5" height="5" />
            <rect x="1" y="7" width="7" height="1" />
        </symbol>
        <symbol id="three-nums">
            <use xlink:href="#num" x="10" y="1"></use>
            <use xlink:href="#num" x="25" y="1"></use>
            <use xlink:href="#num" x="40" y="1"></use>
        </symbol>
        <symbol id="three-numcards">
            <use xlink:href="#three-nums" x="0" y="1"></use>
            <circle cx="14.5" cy="2.5" r="1.3" />
            <circle cx="29.5" cy="2.5" r="1.3" />
            <circle cx="44.5" cy="2.5" r="1.3" />
        </symbol>
        <symbol id="btn">
            <rect x="1" y="1" width="7" height="2" />
        </symbol>
        <symbol id="btns">
            <rect x="1" y="1" width="7" height="2" />
            <rect x="10" y="1" width="7" height="2" />
        </symbol>
        <symbol id="border">
            <rect x="2" y="1" width="56" height="0.1" />
        </symbol>
    </defs>
</svg>


# Content Blocks

### Basic Text with optional Title, Pic, Buttons

<svg class="diag" viewBox="0 0 60 22">
    <use xlink:href="#bg" x="0" y="0"></use>
    <use xlink:href="#text-wide" x="0" y="5"></use>
    <use xlink:href="#border" x="0" y="20"></use>
</svg>
<svg class="diag" viewBox="0 0 60 45">
    <use xlink:href="#bg" x="0" y="0"></use>
    <use xlink:href="#heading-and-sub"></use>
    <use xlink:href="#text-med" x="6" y="17"></use>
    <use xlink:href="#pic-med" x="30" y="16"></use>
    <use xlink:href="#btns" x="20" y="36"></use>
    <use xlink:href="#border" x="0" y="43"></use>
</svg>
<svg class="diag" viewBox="0 0 60 24">
    <use xlink:href="#bg" x="0" y="0"></use>
    <use xlink:href="#text-med" x="25" y="7"></use>
    <use xlink:href="#text-med" x="33" y="7"></use>
    <use xlink:href="#pic-sml" x="6" y="6"></use>
    <use xlink:href="#border" x="0" y="22"></use>
</svg>
<svg class="diag" viewBox="0 0 60 35">
    <use xlink:href="#bg" x="0" y="0"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#text-wide" x="0" y="13"></use>
    <use xlink:href="#btn" x="25" y="26"></use>
    <use xlink:href="#border" x="0" y="33"></use>
</svg>

This content block includes a section of text, with:

- an optional title above the block of text
    - an optional subtitle can be included
- an optional picture alongside the block of text
    - the picture can be on the left or right of the text
    - the picture can be wide, medium or narrow (two thirds, one half, or one third of the page respectively)
- optionally, one or two buttons following the block of text

Note that as everything other than the text block is optional, this 
content block can be used for a plain block of text.

This block is excellent for making a point supported by a vivid image.


### Introductory Text

<svg class="diag" viewBox="0 0 60 22">
    <use xlink:href="#bg" x="0" y="0"></use>
    <use xlink:href="#text-wide" x="0" y="5" stroke-width="0.8"></use>
    <use xlink:href="#border" x="0" y="20"></use>
</svg>

This block is simply a block of text, displayed in a larger-than-usual font.  
The intention of this block is to be used at the top of a page to introduce 
or outline the page's content.

This is sometimes called a lede paragraph or standfirst.


### Text with Styled Background

<svg class="diag" viewBox="0 0 60 35">
    <use xlink:href="#img-bg" x="0" y="0"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#text-wide" x="0" y="13"></use>
    <use xlink:href="#btn" x="25" y="26"></use>
    <use xlink:href="#border" x="0" y="33"></use>
</svg>

This is a paragraph of text, optionally with a heading before and buttons after,
but with a photo or colour filling the entire background of the block.


### Text plus a Feature Number

<svg class="diag" viewBox="0 0 60 34">
    <use xlink:href="#bg" x="0" y="0"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#num" x="8" y="13"></use>
    <use xlink:href="#text-med" x="22" y="13"></use>
    <use xlink:href="#text-med" x="33" y="13"></use>
    <use xlink:href="#btns" x="20" y="26"></use>
    <use xlink:href="#border" x="0" y="32"></use>
</svg>

<svg class="diag" viewBox="0 0 60 24">
    <use xlink:href="#bg" x="0" y="0"></use>
    <use xlink:href="#text-med" x="22" y="7"></use>
    <use xlink:href="#text-med" x="33" y="7"></use>
    <use xlink:href="#num" x="8" y="7"></use>
    <use xlink:href="#border" x="0" y="22"></use>
</svg>

This is a paragraph of text with a "featured" number displayed alongside.  The
number and its units/caption can be on the left or right of the text, and you 
can optionally include a title and/or trailing buttons.

Use this to highlight a remarkable numeric fact, particularly when there is
no good photographic or pictorial way to demonstrate the fact.


### Text plus Three Feature Numbers

<svg class="diag" viewBox="0 0 60 43">
    <use xlink:href="#bg" x="0" y="0"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#three-nums" x="0" y="12"></use>
    <use xlink:href="#text-wide" x="0" y="22"></use>
    <use xlink:href="#btn" x="25" y="35"></use>
    <use xlink:href="#border" x="0" y="41"></use>
</svg>

<svg class="diag" viewBox="0 0 60 30">
    <use xlink:href="#bg" x="0" y="0"></use>
    <use xlink:href="#three-nums" x="0" y="5"></use>
    <use xlink:href="#text-wide" x="0" y="15"></use>
    <use xlink:href="#border" x="0" y="28"></use>
</svg>

This is a set of three "featured" numbers, with units or captions, above
a paragraph of text. You can optionally include a title and/or trailing 
buttons.

Use this to highlight three remarkable numeric facts.


### Featured number cards

<svg class="diag" viewBox="0 0 60 43">
    <use xlink:href="#bg" x="0" y="0"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#three-numcards" x="0" y="12"></use>
    <use xlink:href="#text-wide" x="0" y="22"></use>
    <use xlink:href="#btn" x="25" y="35"></use>
    <use xlink:href="#border" x="0" y="41"></use>
</svg>



### Process step


### Summary cards


### Contact info plus map


### Contact info over map


### Embedded content


### Image gallery




<!-- <svg class="diag"><use class="highlight" xlink:href="#block"></use></svg> -->

