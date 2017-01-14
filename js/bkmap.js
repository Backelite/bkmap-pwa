( function() {
		var rooms = {
			  'creativityRoom': [
			    'B9407F30-F5F8-466E-AFF9-25556B57FE6D-60402-57974',
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-6231-29789',
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-32946-42412',
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-2682-45082'
        ],
        '51': [
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-48415-19953',
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-54718-62030',
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-13283-22069'
        ],
        '53': [
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-21568-452',
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-4556-22387',
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-20921-63726',
          'B9407F30-F5F8-466E-AFF9-25556B57FE6D-42548-50572'
        ]
      };

		var beaconList = {
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-60402-57974': {
        top: 30,
        left: 20,
        floor: 4
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-6231-29789': {
        top: 377,
        left: 11,
        floor: 4
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-48415-19953': {
        top: 375,
        left: 180,
        floor: 4
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-21568-452': {
        top: 103,
        left: 410,
        floor: 4
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-54718-62030': {
        top: 261,
        left: 182,
        floor: 4
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-2682-45082': {
        top: 261,
        left: 178,
        floor: 4
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-32946-42412': {
        top: 160,
        left: 178,
        floor: 4
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-13283-22069': {
        top: 261,
        left: 275,
        floor: 4
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-4556-22387': {
        top: 261,
        left: 278,
        floor: 4
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-20921-63726': {
        top: 261,
        left: 410,
        floor: 4
      },
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D-42548-50572': {
        top: 375,
        left: 410,
        floor: 4
      }
    };

  var laptopsXhrProcessing = false;

  function findNear(beacons, target) {
    if(!beacons) return;
    document.querySelector('.device-pin').style.display = 'none';
    var queryUrl = '?';
    var beaconQueryParam = beacons.map(function(beacon){
      return 'beacons[]='+beacon;
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
          var laptopElement = document.createElement('span');
          laptopElement.className = "people-item";
          laptopElement.innerHTML = laptop.user;
          listContainer.appendChild(laptopElement);
        });
        laptopsXhrProcessing = false;
      }
    }, false);
  }

  var localizeXhrProcessing = false;
  function localize(device) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://localhost:3000/laptops/"+device, true);
    xhr.send();
    xhr.addEventListener("readystatechange", function(){
      localizeXhrProcessing = true;
      if (xhr.readyState == 4){
        var deviceInfos = JSON.parse(xhr.response);
        var beacons = deviceInfos.beacons;
        var coordinates = getBarycenter(beacons);
        var devicePin = document.querySelector('.level--' + beaconList[beacons[0].uuid].floor+ ' .device-pin');
        devicePin.setAttribute('aria-label', deviceInfos.user);
        devicePin.style.display = 'block';
        devicePin.style.top= coordinates.top + 'px';
        devicePin.style.left = coordinates.left + 'px';
        localizeXhrProcessing = false;
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
    findNear: findNear,
    localize: localize
  };
}());

