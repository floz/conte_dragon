var WaterDrop = WaterDrop || ( function WaterDrop() {

    var _imgDropBg = null
    ,   _imgDropReflects = null
    ,   _particleBig = null
    ,   _particleSmall = null
    ,   _cntDrop = null
    ,   _w = 0
    ,   _h = 0
    ,   _canvas = null
    ,   _ctx = null
    ,   _imgNormalMap = null
    ,   _normalMapEffect = null
    ,   _winW = 0
    ,   _winH = 0;

    function _init() {
        _imgDropBg = document.getElementById( "drop_bg" );
        _cntDrop = document.getElementById( "cnt-drop" );
        _particleBig = document.getElementById( "bt-play__particle--big" );
        _particleSmall = document.getElementById( "bt-play__particle--small" );

        _w = _imgDropBg.offsetWidth;
        _h = _imgDropBg.offsetHeight;

        _createCanvas();
        _drawDrop();
        _addDrop();        

        _createNormalMapEffect();

        window.onresize = _onResize;
        _onResize();
    }

    function _createCanvas() {
        _canvas = document.createElement( "canvas" );
        _canvas.width = _w;
        _canvas.height = _h;
        _ctx = _canvas.getContext( "2d" );
    }

    function _drawDrop() {
        _ctx.clearRect( 0, 0, _w, _h );
        _ctx.drawImage( _imgDropBg, 0, 0 );
    }

    function _addDrop() {
        _canvas.className = "drop";

        _cntDrop.removeChild( _imgDropBg );
        _cntDrop.appendChild( _canvas );
    }

    function _createNormalMapEffect() {
        _imgNormalMap = new Image();
        _imgNormalMap.addEventListener( "load", _onNormalMapLoaded, true );
        _imgNormalMap.src = "./img/normal_map_4.png";
    }

    function _onNormalMapLoaded() {
        _imgNormalMap.removeEventListener( "load", _onNormalMapLoaded, true );

        _normalMapEffect = new NormalMapEffect( _ctx, _imgDropBg, _imgNormalMap, _w, _h );
        _normalMapEffect.config( 1, 1.5, 90 );

        window.onmousemove = _render;
    }

    function _render( e ) {
        var cx = e.clientX - ( _winW - 130 ) * .5 + 260
        ,   cy = e.clientY - ( 405 - 160 ) * .5;

        _normalMapEffect.apply( cx, cy, 500 );

        var dx = ( e.clientX - _winW * .5 );
        var dy = ( e.clientY - 500 * .5 );
        var dxAbs = dx;
        if( dxAbs < 0 ) dxAbs = -dxAbs;
        var percent = 1 - dxAbs / 400;
        percent = Math.max( 0, Math.min( percent, 1 ) );
        TweenLite.set( _particleBig, { autoAlpha: percent * .15, x: dx * .02, y: dy * .02 } );

        percent = 1 - dxAbs / 500;
        percent = Math.max( 0, Math.min( percent, 1 ) );
        TweenLite.set( _particleSmall, { autoAlpha: percent * .15, x: dx * .01, y: dy * .01 } );
    }

    function _onResize() {
        _winW = window.innerWidth;
        _winH = window.innerHeight;
    }

    $( document ).ready( _init );

})();