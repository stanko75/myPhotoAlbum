/*global describe, it, beforeEach, window, expect*/
describe("when loading an image", function () {
    "use strict";
    var sut,
        sm,
        googleMapsCallback;

    beforeEach (function() {

        sm = window.SM;
        googleMapsCallback = new sm.GoogleMaps();

        
        sut = new sm.ReadEXIFdata();
        sut.readImage("IMG_20150103_154405.jpg", googleMapsCallback.setMarker);
    });
    it("there should be something in the data", function () {
        expect(sut).toHaveBeenCalledWith(googleMapsCallback.setMarker);
    });
})