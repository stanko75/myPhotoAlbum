/*global window, ko*/
(function (ns) {
    "use strict";

    function Progress() {

        var progressValue = ko.observable(0),
            progressMax = ko.observable(0),
            noOfPics = ko.observable(0),
            noOfPicsLeft = ko.observable(0),
            lastFileName = ko.observable(''),
            noOfPicsAndPicsLeft = ko.computed(function () {
                return noOfPics() + "/" + noOfPicsLeft();
            });

        return {
            poliValue: progressValue,
            poliMax: progressMax,
            noOfPics: noOfPics,
            noOfPicsLeft: noOfPicsLeft,
            noOfPicsAndPicsLeft: noOfPicsAndPicsLeft,
            lastFileName: lastFileName
        };
    }

    function PreloadProgress() {
        ns.Global.progress.poliValue(ns.Global.progress.poliValue() + 1);
        ns.Global.progress.noOfPicsLeft(ns.Global.progress.noOfPicsLeft() - 1);
        if (ns.Global.progress.poliValue() === ns.Global.progress.poliMax()) {
            ns.Global.dialog.close();
        }
    }

    ns.Progress = Progress;
    ns.PreloadProgress = PreloadProgress;
}(window.SM));