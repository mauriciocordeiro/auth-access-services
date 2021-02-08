(function (window) {
    window.env = window.env || {};

    // Environment variables
    window["env"]["urlAuth"] = "${urlAuth}";
    window["env"]["urlCrud"] = "${urlCrud}";
    window["env"]["urlLog"] = "${urlLog}";
})(this);