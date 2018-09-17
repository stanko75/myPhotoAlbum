/*global window, jQuery, ko*/
(function (ns) {
    "use strict";

    var readEXIFdataCallback,
        googleMapsCallback,
        progress,
        dialog,
        log = jQuery('#log');

    log.append("Start<br/>");

    readEXIFdataCallback = new ns.ReadEXIFdata();

    googleMapsCallback = new ns.GoogleMaps();

    dialog = new ns.Dialog();

    progress = new ns.Progress();
    ns.Global.progress = progress;
    ns.Global.dialog = dialog;
    ns.Global.log = new ns.Log();
    ns.Global.iw = new ns.DisplayMapOrImages();

    log.append("Objects created<br/>");

    ko.applyBindings(progress);

    log.append("Binding applied<br/>");

    try {
        ns.Global.dialog.show();
    } catch (e) {
        log.append("Error:" + e + "<br/>");
    }

    jQuery.getJSON("files.json", function (data) {
        ns.Global.json = data;
        ns.Global.progress.poliMax(data.length - 1);
        ns.Global.progress.poliValue(0);

        ns.Global.progress.noOfPicsLeft(data.length - 1);
        ns.Global.progress.noOfPics(data.length - 1);
        ns.Global.progress.lastFileName("");

        data.forEach(function (file) {
            var currentdate = new Date(),
                datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth() + 1)  + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();

            log.append(datetime + " " + window.file + "<br/>");
            window.file = file;
            ns.Global.progress.lastFileName(file);
            ns.Visualize(file, readEXIFdataCallback.readImage, googleMapsCallback.setMarker);
        });
    });
}(window.SM));