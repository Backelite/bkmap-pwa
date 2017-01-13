( function() {
	console.log("test");
		var beacons = [
			{top: 1, left : 7, dist:2},
		];
		getBarycenter(beacons);	

		var xhr = new XMLHttpRequest();
		xhr.open('GET', "http://10.226.132.134:3000", true);
		
		

		xhr.addEventListener("readystatechange", function(){
			if (xhr.readyState == 4){

			}
		}, false);

		<circle data-space="2.04" cx="680.68" cy="466.59" r="66.59" class="map__space" />
	function locate()
	function init(){
		setInterval(xhr.send(), 3000);
	}
	function getBarycenter(beacons) {
		beacons.forEach(function(beacon){
			beacon.dist = 1/beacon.dist;
		});
		var sumCoeff = 0;
		beacons.forEach(function(beacon) {
			sumCoeff = sumCoeff+beacon.dist;
		});
		
		beacons.forEach(function(beacon) {
			var coef= (beacon.dist/sumCoeff);
			beacon.top = beacon.top*coef;
			beacon.left = beacon.left*coef;
		});

		var leftCoordonatesSum = 0;
		beacons.forEach(function(beacon) {
			leftCoordonatesSum = leftCoordonatesSum+beacon.left;
		});

		var topCoordonatesSum = 0;
		beacons.forEach( function(beacon) {
			topCoordonatesSum = topCoordonatesSum+beacon.top;
		});

		barycenter = {top:topCoordonatesSum ,left:leftCoordonatesSum};
		console.log(barycenter);
	}

	init();
}()) 

