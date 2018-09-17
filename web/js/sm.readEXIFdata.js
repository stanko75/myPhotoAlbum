/*global window, EXIF, console, jQuery*/
(function (ns) {
    "use strict";

	function readImage(image, googleMapsCallback) {
    var latDegree,
			latMinute,
			latSecond,
			latDirection,

			lonDegree,
			lonMinute,
			lonSecond,
			lonDirection,
			gpsPositionOfPicture;

		EXIF.getData(image, function() {
			var myData;
			myData = this;

			try {
				latDegree = myData.exifdata.GPSLatitude[0].numerator;
				latMinute = myData.exifdata.GPSLatitude[1].numerator;
				latSecond = myData.exifdata.GPSLatitude[2].numerator / 1000;
				latDirection = myData.exifdata.GPSLatitudeRef;

				lonDegree = myData.exifdata.GPSLongitude[0].numerator;
				lonSecond = myData.exifdata.GPSLongitude[2].numerator / 1000;
				lonMinute = myData.exifdata.GPSLongitude[1].numerator;
				lonDirection = myData.exifdata.GPSLongitudeRef;

				gpsPositionOfPicture = {
					latDegree: latDegree,
					latMinute: latMinute,
					latSecond: latSecond,
					latDirection: latDirection,

					lonDegree: lonDegree,
					lonMinute: lonMinute,
					lonSecond: lonSecond,
					lonDirection: lonDirection
				};
				googleMapsCallback(gpsPositionOfPicture);
			} catch (e) {
				jQuery('#log').append(e.message);
				console.log(e.message);
			}

		});
	}

	function ReadEXIFdata() {
		return {readImage: readImage};
	}

	ns.ReadEXIFdata = ReadEXIFdata;

}(window.SM));