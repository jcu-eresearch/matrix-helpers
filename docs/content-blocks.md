
<style>
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
    /*transform: rotate(-3deg);*/
    float: right;
/*    width: 120px;
    height: 100px;
*/    width: 240px;
    height: 200px;
    margin: 0 1em 1em; 
}
svg use.highlight {
    fill: #ff9;
    fill: rgba(255,255,153, 0.9);
    stroke: #333;
    stroke-width: 0.6;
}
</style>

<svg id="diags" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <symbol id="block-bg">
            <rect x="0" y="0" width="60" height="50" stroke="none" />
        </symbol>
        <symbol id="block-heading">
            <rect x="6" y="7" width="30" height="3" />
            <rect x="6" y="11" width="20" height="2" />
        </symbol>
        <symbol id="block-text-med">
            <line x1="0" y1="1" x2="20" y2="1" />
            <line x1="0" y1="3" x2="6" y2="3" /><line x1="8" y1="3" x2="18" y2="3" />
            <line x1="0" y1="5" x2="19" y2="5" />
            <line x1="0" y1="7" x2="11" y2="7" /><line x1="13" y1="7" x2="20" y2="7" />
            <line x1="0" y1="9" x2="19" y2="9" />
        </symbol>
        <symbol id="block-pic-med">
            <rect x="1" y="1" width="23" height="15" />
            <line x1="3" y1="3" x2="22" y2="14" />
            <line x1="22" y1="3" x2="3" y2="14" />
        </symbol>
        <symbol id="block-pic-sml">
            <rect x="1" y="1" width="15" height="10" />
            <line x1="3" y1="3" x2="14" y2="9" />
            <line x1="14" y1="3" x2="3" y2="9" />
        </symbol>
        <symbol id="block-btns">
            <rect x="1" y="1" width="7" height="2" />
            <rect x="10" y="1" width="7" height="2" />
        </symbol>
        <symbol id="block-border">
            <rect x="2" y="1" width="56" height="0.1" />
        </symbol>
        <symbol id="cb-title-text-pic-btns" viewBox="0 0 60 50">
            <use xlink:href="#block-bg" x="0" y="0"></use>
            <use xlink:href="#block-heading"></use>
            <use xlink:href="#block-text-med" x="6" y="17"></use>
            <use xlink:href="#block-pic-med" x="30" y="16"></use>
            <use xlink:href="#block-btns" x="20" y="36"></use>
            <use xlink:href="#block-border" x="0" y="43"></use>
        </symbol>
        <symbol id="cb-title-text-smallpic-btns" viewBox="0 0 60 50">
            <use xlink:href="#block-bg" x="0" y="0"></use>
            <use xlink:href="#block-heading"></use>
            <use xlink:href="#block-text-med" x="6" y="17"></use>
            <use xlink:href="#block-text-med" x="15" y="17"></use>
            <use xlink:href="#block-pic-sml" x="38" y="16"></use>
            <use xlink:href="#block-btns" x="20" y="32"></use>
            <use xlink:href="#block-border" x="0" y="39"></use>
        </symbol>
    </defs>
</svg>

# Content Blocks

<svg class="diag"><use xlink:href="#cb-title-text-pic-btns"></use></svg>
<svg class="diag"><use xlink:href="#cb-title-text-smallpic-btns"></use></svg>
### Text plus optional Title, Pic, Buttons

- optional title above the text
- optional picture alongside the text
    - picture can be on the left or right side
    - picture can be large, medium or small
- one or two optional buttons following text

<svg class="diag"><use class="highlight" xlink:href="#block"></use></svg>


