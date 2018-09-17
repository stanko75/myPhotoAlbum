/*global document, setTimeout, clearTimeout, window, $*/
(function (ns) {
    "use strict";
    function SettingsWindow() {
        var settingsTimeOut;
        function mouseDownHandler() {
            if (!$("#settingsWindow").hasClass("is-open")) {
                settingsTimeOut = setTimeout(function () {
                    $("#settingsWindow").removeClass("is-closed");
                    $("#settingsWindow").addClass("is-open");
                }, 1000);
            } else {
                $("#settingsWindow").addClass("is-closed");
                $("#settingsWindow").removeClass("is-open");
            }
        }

        function mouseUpHandler() {
            clearTimeout(settingsTimeOut);
        }

        return {
            mouseDownHandler: mouseDownHandler,
            mouseUpHandler: mouseUpHandler
        };
    }

    ns.SettingsWindow = SettingsWindow;
    ns.Global.SettingsWindow = new ns.SettingsWindow();
}(window.SM));