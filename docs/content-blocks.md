
<style>
    h2 { padding: 1em 0; }
    h3, h4 { padding: 3em 0 1em; clear: both; }
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
        /*clear: right;*/
        width: 10em;
        /*width: 240px;*/
        margin: 0 0.5em 0.5em; 

        float: left;
        clear: left;
    }
    svg use.highlight {
        fill: #ff9;
        fill: rgba(255,255,153, 0.9);
        stroke: #333;
        stroke-width: 0.6;
    }
    p, ul {
        margin-left: 12em;
    }
</style>

<svg id="diags" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none">
    <defs>
        <symbol id="bg">
            <rect x="0" y="0" width="60" height="100" stroke="none" />
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
        <symbol id="text-sml">
            <line x1="0" y1="1" x2="8" y2="1" />
            <line x1="0" y1="2.1" x2="3" y2="2.1" /><line x1="3.5" y1="2.1" x2="9" y2="2.1" />
            <line x1="0" y1="3.2" x2="8" y2="3.2" />
            <line x1="0" y1="4.3" x2="5" y2="4.3" />
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
        <symbol id="pic-tiny">
            <rect x="1" y="1" width="6" height="6" />
            <line x1="2" y1="2" x2="6" y2="6" />
            <line x1="6" y1="2" x2="2" y2="6" />
        </symbol>
        <symbol id="pic-tiny-round">
            <circle cx="4" cy="4" r="3" />
            <line x1="2.5" y1="2.5" x2="5.5" y2="5.5" />
            <line x1="5.5" y1="2.5" x2="2.5" y2="5.5" />
        </symbol>
        <symbol id="card-thumbnail">
            <use xlink:href="#pic-tiny"></use>
            <line x1="1.5" y1="8.5" x2="6.5" y2="8.5" />
            <line x1="1.5" y1="9.3" x2="5.5" y2="9.3" />
        </symbol>
        <symbol id="card-thumbnail-round">
            <use xlink:href="#pic-tiny-round"></use>
            <line x1="1.5" y1="8.5" x2="6.5" y2="8.5" />
            <line x1="1.5" y1="9.3" x2="5.5" y2="9.3" />
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
        <symbol id="numcard">
            <rect x="1" y="3" width="13" height="18" />
            <use xlink:href="#num" x="3" y="5"></use>
            <circle cx="7.5" cy="2.5" r="1.3" />
            <use xlink:href="#text-sml" x="3" y="15"></use>
        </symbol>
        <symbol id="three-numcards">
            <use xlink:href="#numcard" x="10" y="1"></use>
            <use xlink:href="#numcard" x="25" y="1"></use>
            <use xlink:href="#numcard" x="40" y="1"></use>
        </symbol>
        <symbol id="processnum">
            <rect x="4" y="1" width="5" height="5" />
        </symbol>
        <symbol id="column-card">
            <use xlink:href="#pic-sml" x="6" y="6"></use>
            <use xlink:href="#heading" x="19"></use>
            <use xlink:href="#text-med" x="25" y="11"></use>
            <use xlink:href="#text-med" x="33" y="11"></use>
        </symbol>
        <symbol id="mosaic-card-short-content">
            <use xlink:href="#pic-sml" x="0" y="0"></use>
            <use xlink:href="#text-sml" x="3" y="13"></use>
            <use xlink:href="#text-sml" x="5" y="13"></use>
        </symbol>
        <symbol id="mosaic-card-short">
            <rect x="1" y="1" width="15" height="19" />
            <use xlink:href="#mosaic-card-short-content"></use>
        </symbol>
        <symbol id="mosaic-card-long-content">
            <use xlink:href="#pic-sml" x="0" y="0"></use>
            <use xlink:href="#text-sml" x="3" y="13"></use>
            <use xlink:href="#text-sml" x="5" y="13"></use>
            <use xlink:href="#text-sml" x="3" y="15.2"></use>
            <use xlink:href="#text-sml" x="5" y="15.2"></use>
            <use xlink:href="#text-sml" x="3" y="21"></use>
            <use xlink:href="#text-sml" x="5" y="21"></use>
        </symbol>
        <symbol id="mosaic-card-long-border">
            <rect x="1" y="1" width="15" height="27" />
        </symbol>
        <symbol id="mosaic-card-long">
            <use xlink:href="#mosaic-card-long-border"></use>
            <use xlink:href="#mosaic-card-long-content"></use>
        </symbol>
        <symbol id="mosaic-card-shortlong">
            <use xlink:href="#mosaic-card-long-border"></use>
            <use xlink:href="#mosaic-card-short-content"></use>
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


## Content Blocks

### Basic Text with optional Title, Pic, Buttons

<svg class="diag" viewBox="0 0 60 22">
    <use xlink:href="#bg"></use>
    <use xlink:href="#text-wide" y="5"></use>
    <use xlink:href="#border" y="20"></use>
</svg>
<svg class="diag" viewBox="0 0 60 45">
    <use xlink:href="#bg"></use>
    <use xlink:href="#heading-and-sub"></use>
    <use xlink:href="#text-med" x="6" y="17"></use>
    <use xlink:href="#pic-med" x="30" y="16"></use>
    <use xlink:href="#btns" x="20" y="36"></use>
    <use xlink:href="#border" y="43"></use>
</svg>
<svg class="diag" viewBox="0 0 60 24">
    <use xlink:href="#bg"></use>
    <use xlink:href="#text-med" x="25" y="7"></use>
    <use xlink:href="#text-med" x="33" y="7"></use>
    <use xlink:href="#pic-sml" x="6" y="6"></use>
    <use xlink:href="#border" y="22"></use>
</svg>
<svg class="diag" viewBox="0 0 60 35">
    <use xlink:href="#bg"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#text-wide" y="13"></use>
    <use xlink:href="#btn" x="25" y="26"></use>
    <use xlink:href="#border" y="33"></use>
</svg>

This content block includes a section of text, with:

- an optional title above the block of text
    - an optional subtitle can be included
- an optional picture alongside the block of text
    - the picture can be on the left or right of the text
    - the picture can be wide, medium or narrow (two thirds, 
    one half, or one third of the page respectively)
- optionally, one or two buttons following the block of text

Note that as everything other than the text block is optional
(and generally defaults to "don't show") **this content block is 
the right choice for a plain block of text**.

This block with a picture is excellent for making a point 
supported by a vivid image. A series of these blocks with 
the picture location alternating between left and right
can produce a pleasing visually balanced page.


### Introductory Text

<svg class="diag" viewBox="0 0 60 22">
    <use xlink:href="#bg"></use>
    <use xlink:href="#text-wide" y="5" stroke-width="0.8"></use>
    <use xlink:href="#border" y="20"></use>
</svg>

This block is simply a block of text, displayed in a 
larger-than-usual font.  Use this block at the top of a page 
to introduce or outline the page's content.

This is sometimes called a lede paragraph or standfirst.


### Text with Styled Background

<svg class="diag" viewBox="0 0 60 35">
    <use xlink:href="#img-bg"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#text-wide" y="13"></use>
    <use xlink:href="#btn" x="25" y="26"></use>
    <use xlink:href="#border" y="33"></use>
</svg>

This is a paragraph of text, optionally with a heading before and 
buttons after, but with a photo or colour filling the entire 
background of the block. Alternate these blocks with other types
to produce a visually dramatic page, or use sparingly to break
up a longer text-heavy page into sections.


### Text plus a Feature Number

<svg class="diag" viewBox="0 0 60 34">
    <use xlink:href="#bg"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#num" x="8" y="13"></use>
    <use xlink:href="#text-med" x="22" y="13"></use>
    <use xlink:href="#text-med" x="33" y="13"></use>
    <use xlink:href="#btns" x="20" y="26"></use>
    <use xlink:href="#border" y="32"></use>
</svg>

<svg class="diag" viewBox="0 0 60 24">
    <use xlink:href="#bg"></use>
    <use xlink:href="#text-med" x="22" y="7"></use>
    <use xlink:href="#text-med" x="33" y="7"></use>
    <use xlink:href="#num" x="8" y="7"></use>
    <use xlink:href="#border" y="22"></use>
</svg>

This is a paragraph of text with a "featured" number 
displayed alongside.  The number and its units/caption 
can be on the left or right of the text, and you can 
optionally include a title and/or trailing buttons.

Use this to highlight a remarkable numeric fact, 
particularly when there is no good photographic or 
pictorial way to demonstrate the fact.


### Text plus Three Feature Numbers

<svg class="diag" viewBox="0 0 60 43">
    <use xlink:href="#bg"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#three-nums" y="12"></use>
    <use xlink:href="#text-wide" y="22"></use>
    <use xlink:href="#btn" x="25" y="35"></use>
    <use xlink:href="#border" y="41"></use>
</svg>

<svg class="diag" viewBox="0 0 60 30">
    <use xlink:href="#bg"></use>
    <use xlink:href="#three-nums" y="5"></use>
    <use xlink:href="#text-wide" y="15"></use>
    <use xlink:href="#border" y="28"></use>
</svg>

This is a set of three "featured" numbers, with units 
(or very short captions), above a paragraph of text. 
You can optionally include a title and/or trailing 
buttons.

Unlike **Featured Number Cards**, this block has a 
single text section that lies under all three numbers.

Use this to highlight three remarkable numeric facts.


### Featured number cards

<svg class="diag" viewBox="0 0 60 41">
    <use xlink:href="#bg"></use>
    <use xlink:href="#heading" x="8.5"></use>
    <use xlink:href="#numcard" x="5" y="13"></use>
    <use xlink:href="#numcard" x="22" y="13"></use>
    <use xlink:href="#numcard" x="39" y="13"></use>
    <use xlink:href="#border" y="39"></use>
</svg>

<svg class="diag" viewBox="0 0 60 38">
    <use xlink:href="#bg"></use>
    <use xlink:href="#numcard" x="5" y="5"></use>
    <use xlink:href="#numcard" x="22" y="5"></use>
    <use xlink:href="#numcard" x="39" y="5"></use>
    <use xlink:href="#btns" x="21" y="30"></use>
    <use xlink:href="#border" y="36"></use>
</svg>

This is a set of three "featured" numbers, with units (or very 
short captions), each with a separate paragraph of text. You 
can optionally include a title and/or trailing buttons.

Unlike **Text plus Three Featured Numbers**, this block lets
you give each number its own paragraph of text and is well
suited to less text-heavy pages.

This block also supports a "count up" animation which will
rapidly increase the numbers from 0 to their final value when
this block scrolls into view.  Turn this animation on in the
block's settings. (more about animations?)


### Process step

<svg class="diag" viewBox="0 0 60 27">
    <use xlink:href="#bg"></use>
    <use xlink:href="#processnum" y="6"></use>
    <use xlink:href="#heading" x="6"></use>
    <use xlink:href="#text-med" x="12" y="11"></use>
    <use xlink:href="#text-med" x="22" y="11"></use>
    <use xlink:href="#border" y="25"></use>
</svg>

<svg class="diag" viewBox="0 0 60 26">
    <use xlink:href="#bg"></use>
    <use xlink:href="#processnum" y="6"></use>
    <use xlink:href="#heading" x="6"></use>
    <use xlink:href="#text-med" x="12" y="11"></use>
    <use xlink:href="#text-med" x="22" y="11"></use>
    <use xlink:href="#btn" x="46" y="6"></use>
    <use xlink:href="#btn" x="46" y="9"></use>
</svg>

This block is used to make a list of steps which can be used
to describe multi-step processes such as applying for a grant
or planning a trip.  A single process step block displays a
large "step" number on the left, a heading and text block in
the centre, and optionally images or supporting links on the
right (which you could use to link to a PDF form).

This block also supports switching off the horizontal line
that normally shows at the bottom of every content block.

**Heads up!** The editing previews for this block will always
show the number `1` as their process step number.  This is
due to the way that the styling works and automatically
numbers steps based upon how many are shown on the final page.


### Summary cards

Summary cards are used to show lists of "cards". You use this
for making a list of the staff in your department, or a list
of projects in your centre. Each "card" is represented by 
a page in Squiz Matrix.

That means you can create a Matrix page for each staff member
in your group with a bio and photo, and easily show a staff 
list for each project or sub-group.

There are several formats for **Summary cards**.  Every format
allows an optional heading, can optionally reshape images into
circles, and permits the first card in the list to be marked 
with some additonal text and a highlight, which might be 
useful for tagging the first item as the "Theme Leader" or
"Featured Project".



#### Summary cards: Column layout

<svg class="diag" viewBox="0 0 60 78">
    <use xlink:href="#bg"></use>
    <use xlink:href="#heading-and-sub"></use>
    <use xlink:href="#column-card" y="12"></use>
    <use xlink:href="#column-card" y ="32"></use>
    <use xlink:href="#column-card" y ="52"></use>
    <use xlink:href="#border" y="76"></use>
</svg>

The column layout stacks the "cards" into a single column.
Related images (for example, the project's title image) 
can be displayed on the left or right.

This format is best suited for shorter lists of projects
or other items when the text description of each item is 
important.


#### Summary cards: Mosaic layout

<svg class="diag" viewBox="0 0 60 79">
    <use xlink:href="#bg"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#mosaic-card-short" x="5" y="12"></use>
    <use xlink:href="#mosaic-card-long" x="5" y="33"></use>
    <use xlink:href="#mosaic-card-long" x="22" y="12"></use>
    <use xlink:href="#mosaic-card-long" x="22" y="41"></use>
    <use xlink:href="#mosaic-card-short" x="39" y="12"></use>
    <use xlink:href="#mosaic-card-short" x="39" y="33"></use>
    <use xlink:href="#mosaic-card-short" x="39" y="54"></use>
    <use xlink:href="#border" y="77"></use>
</svg>

The mosaic layout arranges cards into three columns, fitting
each card closely to the end of the card above. This results
in a more organic, less regular looking layout, and is best
suited to situations where ordering is less important, and
the viewer can be expected to *browse* through the set of
cards.


#### Summary cards: Grid layout

<svg class="diag" viewBox="0 0 60 79">
    <use xlink:href="#bg"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#mosaic-card-shortlong" x="5" y="12"></use>
    <use xlink:href="#mosaic-card-long" x="5" y="41"></use>
    <use xlink:href="#mosaic-card-long" x="22" y="12"></use>
    <use xlink:href="#mosaic-card-shortlong" x="22" y="41"></use>
    <use xlink:href="#mosaic-card-shortlong" x="39" y="12"></use>
    <use xlink:href="#border" y="77"></use>
</svg>

The grid layout arranges cards into three columns and makes 
each card's height match its neighbours, resulting in a clean
grid.


#### Summary cards: Thumbnail grid layout

<svg class="diag" viewBox="0 0 60 44">
    <use xlink:href="#bg"></use>
    <use xlink:href="#heading-and-sub"></use>
    <use xlink:href="#card-thumbnail" x="5" y="16"></use>
    <rect x="5" y="16" width="8" height="11" />
    <use xlink:href="#card-thumbnail" x="13" y="16"></use>
    <use xlink:href="#card-thumbnail" x="21" y="16"></use>
    <use xlink:href="#card-thumbnail" x="29" y="16"></use>
    <use xlink:href="#card-thumbnail" x="37" y="16"></use>
    <use xlink:href="#card-thumbnail" x="45" y="16"></use>
    <use xlink:href="#card-thumbnail" x="5" y="27"></use>
    <use xlink:href="#card-thumbnail" x="13" y="27"></use>
    <use xlink:href="#card-thumbnail" x="21" y="27"></use>
    <use xlink:href="#card-thumbnail" x="29" y="27"></use>
    <use xlink:href="#border" y="42"></use>
</svg>

<svg class="diag" viewBox="0 0 60 42">
    <use xlink:href="#bg"></use>
    <use xlink:href="#heading"></use>
    <use xlink:href="#card-thumbnail-round" x="5" y="14"></use>
    <use xlink:href="#card-thumbnail-round" x="13" y="14"></use>
    <use xlink:href="#card-thumbnail-round" x="21" y="14"></use>
    <use xlink:href="#card-thumbnail-round" x="29" y="14"></use>
    <use xlink:href="#card-thumbnail-round" x="37" y="14"></use>
    <use xlink:href="#card-thumbnail-round" x="45" y="14"></use>
    <use xlink:href="#card-thumbnail-round" x="5" y="25"></use>
    <use xlink:href="#card-thumbnail-round" x="13" y="25"></use>
    <use xlink:href="#border" y="40"></use>
</svg>

The thumbnail grid layout turns card images into thumbnails,
arranged six across. This is an excellent layout for showing
staff associated with your department or project. The
ability to highlight the first item is also particularly 
useful in this layout.


### Contact info plus map


### Contact info over map


### Embedded content


### Image gallery




<!-- <svg class="diag"><use class="highlight" xlink:href="#block"></use></svg> -->

