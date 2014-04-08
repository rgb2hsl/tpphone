/**
 * @author ru-web-designer
 */

(function ( $ ) {

    function getISOCode(phone){
        var ru = /^\+7[34589]\d*/;
        var rue = /^8[34589]\d*/;
        var ua = /^\+380\d*/;
        var us = /^\+1\d*/;
        var free = /^[\+\d][\d]*[\-\+\*#\s\(\)]+.*/;

        //паттерн free уникальный в своём роде т.к. пересекается с другими и является проприаритарным
        if (phone.search(free) != -1) {
            return "free";
        }

        if (phone.search(ru) != -1) {
            return "ru";
        } else if (phone.search(rue) != -1) {
            //типа ru + eight
            return "rue";
        } else if (phone.search(ua) != -1) {
            return "ua";
        } else if (phone.search(us) != -1) {
            return "us";
        } else {
            return false;
        }
    }

    //возможно лучше сделать массивом
    function getMask(ISOCode) {
        var mask = "p";

        if (ISOCode === false || ISOCode === "free") {
            mask = "p";
        } else if (ISOCode === "ru") {
            mask = "+0 000 000-00-00bp";
        } else if (ISOCode === "rue") {
            mask = "0 000 000-00-00bp";
        } else if (ISOCode === "ua") {
            mask = "+000 00 000-00-00bp";
        } else if (ISOCode === "us") {
            mask = "+0 000 000-00-00bp";
        }

        return mask;
    }

    $.fn.tpphone = function () {

        //dependency
        if (!$.fn.mask) {
            return this;
        }

        var elements = this,
            options = {
                translation: {
                    "p": {
                        pattern: /[\-\+\*\s\d]/,
                        recursive: true
                    },
                    "b": {
                        pattern: /[\-\+\*#\s\(\)\[\]]/,
                        recursive: true
                    },
                    "+": {
                        pattern: /\+/
                    }
                },
                maxlength: false
            };

        function maskChange() {
            elements.mask(getMask(getISOCode(elements.cleanVal())), options);
        }

        elements.on("keyup.tpphone paste.tpphone drop.tpphone", maskChange);

        this.mask("p", options);

        return this;
    };

}( jQuery ));