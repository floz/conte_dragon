var Main = ( function Main() {

	function Main() {
		var stats = new Stats();
		stats.setMode(0); // 0: fps, 1: ms

		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';

		document.body.appendChild( stats.domElement );

		setInterval( function () {

		    stats.begin();

		    // your code goes here

		    stats.end();

		}, 1000 / 60 );
	}
	Main.prototype.constructor = Main;

	return Main;

})();

$( document ).ready( init );

function init() {
	new Main();
}