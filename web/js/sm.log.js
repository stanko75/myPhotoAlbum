/*global window, ko*/
(function (ns) {
    "use strict";
    var visible = ko.observable(false),
        text = ko.observable("Show log");

    function click () {
        visible(!visible());
        text(visible() ? "Hide log": "Show log");
    }

    function Log() {
        return {
            click: click,
            visible: visible,
            text: text
        };
    }

   ns.Log = Log;
}(window.SM));