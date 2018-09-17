/*global window, google, document*/
(function (ns) {
    "use strict";
    var marker = [],
        map;
    function clickMarkerHandler() {
        window.open("http://www.milosev.com", "_blank");
    }

    function convertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = degrees + minutes / 60 + seconds / (60 * 60);

        if (direction === "S" || direction === "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    }

    function setMarker(gpsPositionOfPicture) {
        var gLat,
            gLon,
            myLatlng;

        gLat = convertDMSToDD(gpsPositionOfPicture.latDegree,
                gpsPositionOfPicture.latMinute,
                gpsPositionOfPicture.latSecond,
                gpsPositionOfPicture.latDirection
            );

        gLon = convertDMSToDD(gpsPositionOfPicture.lonDegree,
                gpsPositionOfPicture.lonMinute,
                gpsPositionOfPicture.lonSecond,
                gpsPositionOfPicture.lonDirection
            );

        myLatlng = new google.maps.LatLng(gLat, gLon);

        marker.push(new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Hello World!'
        }));

        map.setCenter(marker[marker.length - 1].getPosition());

        google.maps.event.addListener(marker[marker.length - 1], 'click', clickMarkerHandler);
        ns.PreloadProgress();
    }

    function GoogleMaps() {
        var mapOptions,
            mapCanvas;

        mapOptions = {
            zoom: 6,
            center: { lat: -34.397, lng: 150.644},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        mapCanvas = document.getElementById('map-canvas');

        if (!map) {
            map = new google.maps.Map(mapCanvas, mapOptions);
        }

        google.maps.event.addListener(map, "mousedown", ns.Global.SettingsWindow.mouseDownHandler);

        google.maps.event.addListener(map, "mouseup", ns.Global.SettingsWindow.mouseUpHandler);

        return {
            setMarker: setMarker,
            map: map,
            marker: marker
        };
    }

    ns.GoogleMaps = GoogleMaps;

}(window.SM));