( function() {
		var rooms = {
			  'creativityRoom': [
			    'B9407F30-F5F8-466E-AFF9-25556B57FE6D-60402-57974',
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-6231-29789'
        ],
        '51': [
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-48415-19953'
        ],
        '53': [
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-21568-452'
        ]
      };

		var beaconList = {
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-60402-57974': {
        top: 30,
        left: 20
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-6231-29789': {
        top: 377,
        left: 11
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-48415-19953': {
        top: 375,
        left: 180
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-21568-452': {
        top: 103,
        left: 410
      }
    };

  var laptopsXhrProcessing = false;

  function findNear(beacons, target) {
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
        var laptops = JSON.parse(laptopsXhr.response);
        var listContainer = document.querySelector('.content__item[data-space="'+target+'"]');
        listContainer.innerHTML = '';
        laptops.forEach(function(laptop){
          var laptopElement = document.createElement('li');
          laptopElement.innerHTML = laptop.user;
          listContainer.appendChild(laptopElement);
        });
        laptopsXhrProcessing = false;
      }
    }, false);
  }

	function getBarycenter(beacons) {
    // TODO refactor this shit
    return {
		  top: ((1/beacons[0].distance)*beaconList[beacons[0].uuid].top+(1/beacons[1].distance)*beaconList[beacons[1].uuid].top+(1/beacons[2].distance)*beaconList[beacons[2].uuid].top) / ((1/beacons[0].distance) + (1/beacons[1].distance) + (1/beacons[2].distance)),
      left: ((1/beacons[0].distance)*beaconList[beacons[0].uuid].left+(1/beacons[1].distance)*beaconList[beacons[1].uuid].left+(1/beacons[2].distance)*beaconList[beacons[2].uuid].left) / ((1/beacons[0].distance) + (1/beacons[1].distance) + (1/beacons[2].distance)),
    };
	}

  window.BkMap = {
    rooms: rooms,
    beacons: beaconList,
    findNear: findNear
  };
}());

