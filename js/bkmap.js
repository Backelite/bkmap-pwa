( function() {
		var rooms = {
			  'creativityRoom': [
			    'B9407F30-F5F8-466E-AFF9-25556B57FE6D-60402-57974',
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-6231-29789'
        ],
        '51': [
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-48415-19953'
        ],
        'landing': [
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-21568-452'
        ]
      };

  var laptopsXhrProcessing = false;

  function findNear(beacons) {
    var queryUrl = '?';
    var beaconQueryParam = beacons.map(function(beacon){
      return 'beacon[]='+beacon;
    });

    queryUrl += beaconQueryParam.join('&');

    var laptopsXhr = new XMLHttpRequest();
    laptopsXhr.open('GET', "http://localhost:3000/laptops"+queryUrl, true);
    laptopsXhr.send();
    laptopsXhr.addEventListener("readystatechange", function(){
      laptopsXhrProcessing = true;
      if (laptopsXhr.readyState == 4){
        laptopsXhrProcessing = false;
      }
    }, false);
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

  [].forEach.call(document.querySelectorAll('[data-room]'), function(roomPin) {
    roomPin.addEventListener('click', function(evt){
      findNear(rooms[evt.currentTarget.dataset.room]);
    });
  });
}());

