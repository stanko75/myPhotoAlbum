/*global window, ko*/
(function (ns) {
    "use strict";

    function DisplayMapOrImages() {
        var text = ko.observable("Display images"),
            displayImages = ko.observable(false),
            imgSrc = ko.observable(""),
            i = 0;

        displayImages.subscribe(function () {
            if (displayImages()) {
                imgSrc(ns.Global.json[i]);
            }
        });

        function next() {
            i = i + 1;
            imgSrc(ns.Global.json[i]);
        }

        function prev() {
            i = i - 1;
            imgSrc(ns.Global.json[i]);
        }

        return {
            text: text,
            displayImages: displayImages,
            imgSrc: imgSrc,
            next: next,
            prev: prev
        };
    }

    ns.DisplayMapOrImages = DisplayMapOrImages;
}(window.SM));
