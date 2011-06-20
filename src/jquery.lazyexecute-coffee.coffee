do (jQuery, window) ->
    dataStoreKey = "lazyExecute";
    _window = jQuery(window)
    dataCache = {};
    elemEventStop = "stop";
    elemEventContinue = "continue";
    version = "0.0.1";

    class LazyExecute
        constructor: (datakey) ->
            @datakey = datakey
            @bindFunction = () => @_lazyexecute this
        version: ->
            version;
        aboveTheScreen: (elem) ->
            _window.scrollTop() >= elem.offset().top + elem.height()
        belowTheScreen: (elem) ->
            (_window.height() + _window.scrollTop()) <= elem.offset().top
        leftTheScreen: (elem) ->
            _window.scrollLeft() >= elem.offset().left + elem.width()
        rightTheScreen: (elem) ->
            (_window.width() + _window.scrollLeft()) <= elem.offset().left
        _lazyexecute: (e) ->
            self = this;
            data = _window.data(this.datakey);
            stopflg = false;
            $(data.elems).each (index, elem) ->
                celem = $(this);
                if not self.aboveTheScreen(celem) &&
                   not self.belowTheScreen(celem) &&
                   not self.leftTheScreen(celem) &&
                   not self.rightTheScreen(celem)
                    if data.callback.apply(celem, e) == elemEventStop
                        stopflg = true;
                        delete data.elems[index];
            if stopflg
                @stopExecute()
        getLazyExecuteTargetElems: ->
            storedData = _window.data(this.datakey);
            if not storedData
                return [];
            else
                return storedData.elems;
        unbindLazyExecute : ->
            delete dataCache[@datakey]
            _window.removeData(@datakey)
            _window.unbind 'scroll', @bindFunction
        bindLazyExecute: ->
            _window.bind 'scroll', @bindFunction;
            _window.trigger 'scroll'
        stopExecute: ->
            data = _window.data(this.datakey).elems
            for len in [data.length-1..0]
                if not data[len]?
                    data.splice len, 1
            return null

    jQuery.fn.extend
        lazyExecute: () ->
            callback = arguments[0] || null
            if typeof callback == "function"
                datakey  = arguments[1] || dataStoreKey;
            if typeof callback != "function"
                callback = null
                datakey  = arguments[0] || dataStoreKey

            data = _window.data(datakey);
            if !data
                data = {elems:[], callback:null}

            @each ->
                if $.inArray(this, data.elems) == -1
                    data.elems.push this;

            if callback != null && data.callback == null
                data.callback = callback

            _window.data datakey, data

            lazyexecute = dataCache[datakey]
            if !lazyexecute
                lazyexecute = new LazyExecute(datakey);
                lazyexecute.bindLazyExecute();
                dataCache[datakey] = lazyexecute;

            return lazyexecute;

    jQuery.extend jQuery.fn.lazyExecute,
        STOP: elemEventStop,
        CONTINUE: elemEventContinue

    return null;