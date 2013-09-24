var WaterDrop = WaterDrop || ( function WaterDrop() {

    var _imgDropBg = null
    ,   _imgDropReflects = null
    ,   _cntDrop = null
    ,   _w = 0
    ,   _h = 0
    ,   _canvas = null
    ,   _ctx = null
    ,   _imgNormalMap = null
    ,   _normalMapEffect = null;

    function init() {
        _imgDropBg = document.getElementById( "drop_bg" );
        _imgDropReflects = document.getElementById( "drop_reflects" );
        _cntDrop = document.getElementById( "cnt-drop" );

        _w = _imgDropBg.offsetWidth;
        _h = _imgDropBg.offsetHeight;

        createCanvas();
        drawDrop();
        addDrop();        

        createNormalMapEffect();
    }

    function createCanvas() {
        _canvas = document.createElement( "canvas" );
        _canvas.width = _w;
        _canvas.height = _h;
        _ctx = _canvas.getContext( "2d" );
    }

    function drawDrop() {
        _ctx.clearRect( 0, 0, _w, _h );
        _ctx.drawImage( _imgDropBg, 0, 0 );
    }

    function addDrop() {
        _canvas.className = "drop";

        _cntDrop.removeChild( _imgDropBg );
        _cntDrop.insertBefore( _canvas, _imgDropReflects );
    }

    function createNormalMapEffect() {
        _imgNormalMap = new Image();
        _imgNormalMap.addEventListener( "load", onNormalMapLoaded, true );
        _imgNormalMap.src = "./img/normal_map.png";
    }

    function onNormalMapLoaded() {
        _imgNormalMap.removeEventListener( "load", onNormalMapLoaded, true );

        _normalMapEffect = new NormalMapEffect( _ctx, _imgDropBg, _imgNormalMap, _w, _h );
    }

    $( document ).ready( init );

})();