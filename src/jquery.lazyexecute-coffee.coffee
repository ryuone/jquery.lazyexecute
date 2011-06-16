do (jQuery, window) ->
    dataStoreKey = "lazyExecute"
    _window = jQuery(window)
    jQuery.extend
        aboveTheScreen: (elem) ->
            _window.scrollTop() >= elem.offset().top + elem.height()
        belowTheScreen: (elem) ->
            (_window.height() + _window.scrollTop()) <= elem.offset().top
        leftTheScreen: (elem) ->
            _window.scrollLeft() >= elem.offset().left + elem.width()
        rightTheScreen: (elem) ->
            (_window.width() + _window.scrollLeft()) <= elem.offset().left
        _lazyexecute: (e) ->
            e.data.elems.each ->
                if not $.aboveTheScreen(this) &&
                   not $.belowTheScreen(this) &&
                   not $.leftTheScreen(this) &&
                   not $.rightTheScreen(this)
                    e.data.storeddata.callback.apply(this, e);
        getLazyExecuteTargetElems: ->
            storedData = _window.data(dataStoreKey);
            if not storedData
                return [];
            else
                return storedData.elems;
        unbindLazyExecute : ->
            _window.removeData(dataStoreKey)
            _window.unbind 'scroll', this._lazyexecute
        bindLazyExecute: ->
            data = _window.data dataStoreKey
            elems = $(data.elems)
            _window.bind 'scroll', storeddata:data, elems:elems, this._lazyexecute;
            _window.trigger('scroll')
            return null

    jQuery.fn.extend
        lazyExecute: (callback) ->
            data = _window.data(dataStoreKey)
            if not datau
                data =
                    elems:[]
                    callback:null
            this.each ->
                data.elems.push($(this));
            data.callback = callback
            _window.data(dataStoreKey, data)
            $.bindLazyExecute()
            return this
    return null
