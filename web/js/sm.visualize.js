/*global window, XMLHttpRequest, console, Image, URL, jQuery*/
(function (ns) {
    "use strict";

    function onHttpRequestLoad(xhr, readEXIFcallback, googleMapsCallback) {
        if (xhr.status === 200) {
            var image = new Image();

            image.src = URL.createObjectURL(xhr.response);
            image.onload = function () {
                readEXIFcallback(image, googleMapsCallback);
            };
        } else {
            console.log("error");
        }
    }

    function Visualize(imageName, readEXIFcallback, googleMapsCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", imageName, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            onHttpRequestLoad(this, readEXIFcallback, googleMapsCallback);
        };
        xhr.send();
    }

    ns.Visualize = Visualize;
}(window.SM));