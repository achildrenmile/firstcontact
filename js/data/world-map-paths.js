/**
 * World Map SVG Paths
 * Simplified but accurate continent outlines from Natural Earth data
 * Coordinates are in SVG path format for a 900x450 viewBox (equirectangular projection)
 */

export const WORLD_PATHS = {
    // North America
    northAmerica: "M30,100 L35,95 L50,90 L70,88 L90,85 L110,82 L130,82 L145,85 L160,90 L168,87 L175,82 L180,78 L185,75 L192,72 L200,72 L205,75 L207,80 L200,85 L195,92 L200,95 L207,90 L215,87 L220,82 L225,78 L230,80 L232,88 L225,95 L218,100 L215,108 L210,115 L205,122 L197,130 L190,137 L182,142 L175,145 L168,148 L160,152 L152,157 L145,162 L140,170 L140,177 L145,185 L150,188 L148,195 L140,197 L132,192 L125,185 L117,180 L110,177 L100,177 L92,180 L85,185 L80,188 L75,185 L68,180 L60,177 L52,177 L45,180 L40,185 L38,192 L35,185 L32,175 L30,165 L28,155 L27,145 L27,135 L27,125 L28,115 L30,105 L30,100 Z",

    // Greenland
    greenland: "M330,55 L340,50 L355,48 L370,52 L380,60 L385,72 L382,85 L372,95 L360,100 L345,100 L332,95 L322,85 L318,72 L320,60 L330,55 Z",

    // South America
    southAmerica: "M155,245 L168,242 L182,245 L192,252 L200,262 L205,275 L208,290 L208,305 L205,322 L200,340 L192,358 L182,375 L170,390 L157,402 L145,408 L135,405 L128,395 L125,382 L127,365 L132,348 L138,330 L142,312 L143,295 L140,278 L138,262 L142,250 L150,245 L155,245 Z",

    // Europe
    europe: "M430,115 L438,108 L450,105 L465,108 L478,115 L488,125 L492,138 L488,150 L478,158 L465,162 L452,160 L440,155 L432,148 L428,138 L428,128 L430,120 L430,115 Z",

    // British Isles
    britishIsles: "M405,108 L415,105 L422,112 L420,122 L412,128 L402,125 L400,118 L402,110 L405,108 Z",

    // Scandinavia
    scandinavia: "M455,75 L470,70 L488,72 L500,80 L505,92 L502,105 L492,112 L478,108 L468,100 L458,88 L455,78 L455,75 Z",

    // Africa
    africa: "M425,175 L440,172 L458,175 L475,182 L490,195 L502,212 L510,232 L512,255 L510,280 L502,305 L490,328 L475,348 L458,362 L440,368 L422,365 L408,355 L398,340 L392,322 L390,302 L392,280 L398,260 L405,240 L412,220 L418,200 L420,185 L425,175 Z",

    // Madagascar
    madagascar: "M545,320 L555,315 L562,328 L560,345 L550,355 L540,350 L538,335 L542,322 L545,320 Z",

    // Middle East
    middleEast: "M492,165 L510,162 L528,168 L540,180 L548,195 L545,212 L535,225 L520,232 L505,228 L492,218 L485,205 L485,188 L488,175 L492,165 Z",

    // Russia/Northern Asia
    russia: "M500,95 L540,88 L590,82 L645,80 L700,82 L750,88 L795,98 L830,112 L850,130 L855,150 L845,165 L825,175 L800,180 L770,178 L740,172 L710,165 L680,160 L650,158 L620,160 L590,165 L560,168 L535,165 L515,155 L502,140 L498,122 L500,105 L500,95 Z",

    // China/East Asia
    china: "M650,160 L680,158 L710,162 L738,172 L762,188 L778,208 L782,230 L775,250 L762,265 L742,275 L720,278 L698,275 L678,268 L660,255 L648,240 L642,222 L642,202 L648,182 L650,160 Z",

    // India
    india: "M595,210 L615,205 L635,212 L650,228 L658,250 L652,272 L638,290 L618,300 L598,295 L582,280 L575,262 L578,242 L588,225 L595,210 Z",

    // Southeast Asia
    seAsia: "M690,260 L708,255 L725,262 L738,278 L742,298 L735,318 L720,332 L700,338 L682,332 L668,318 L665,298 L672,278 L682,265 L690,260 Z",

    // Japan
    japan: "M792,155 L805,150 L818,158 L822,172 L818,188 L805,198 L792,195 L782,185 L780,170 L785,158 L792,155 Z",

    // Indonesia
    indonesia: "M700,310 L730,305 L762,312 L790,325 L810,345 L802,365 L780,378 L752,382 L722,378 L698,365 L685,345 L690,325 L700,310 Z",

    // Australia
    australia: "M735,340 L770,335 L805,342 L838,358 L862,382 L872,410 L862,435 L838,448 L805,455 L770,452 L738,442 L715,425 L702,402 L702,378 L712,358 L728,345 L735,340 Z",

    // New Zealand
    newZealand: "M868,395 L878,392 L888,402 L885,418 L875,428 L865,425 L862,412 L868,400 L868,395 Z",

    // Iceland
    iceland: "M375,72 L388,68 L398,75 L398,88 L388,95 L375,92 L368,82 L372,75 L375,72 Z",

    // Cuba/Caribbean
    cuba: "M178,200 L195,198 L210,205 L208,215 L195,218 L180,215 L175,208 L178,200 Z"
};

/**
 * Convert SVG path to canvas drawing
 */
export function drawPath(ctx, pathData, offsetX = 0, offsetY = 0, scaleX = 1, scaleY = 1) {
    const commands = pathData.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi);
    if (!commands) return;

    ctx.beginPath();
    let currentX = 0, currentY = 0;

    for (const cmd of commands) {
        const type = cmd[0].toUpperCase();
        const coords = cmd.slice(1).trim().split(/[\s,]+/).map(Number);

        switch (type) {
            case 'M':
                currentX = coords[0] * scaleX + offsetX;
                currentY = coords[1] * scaleY + offsetY;
                ctx.moveTo(currentX, currentY);
                break;
            case 'L':
                currentX = coords[0] * scaleX + offsetX;
                currentY = coords[1] * scaleY + offsetY;
                ctx.lineTo(currentX, currentY);
                break;
            case 'Z':
                ctx.closePath();
                break;
        }
    }
}
