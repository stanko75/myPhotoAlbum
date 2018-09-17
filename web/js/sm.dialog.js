/*global document, window, ko*/
(function (ns) {
    "use strict";

    function Dialog() {
        var handle;

        handle = ko.observable("");

        return {
            handle: handle,
            show: function () {
                handle("progress is-open");
            },
            close: function () {
                handle("progress is-close");
            }
        };
    }
    ns.Dialog = Dialog;
}(window.SM));