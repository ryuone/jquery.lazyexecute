/**
 * Lazy Execute : This is jQuery plugin.
 *   When some elements available on display area, the callback get executed.
 *
 * Copyright (C) 2011 Ryuichi Maeno <ryuone@gmail.com>
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function($, window){
    var dataStoreKey = "lazyExecute";
    var _window = $(window);
    $.extend({
        aboveTheScreen : function(elem){
            return _window.scrollTop() >= elem.offset().top + elem.height();
        },
        belowTheScreen : function(elem){
            return (_window.height() + _window.scrollTop()) <= elem.offset().top;
        },
        leftTheScreen : function(elem){
            return _window.scrollLeft() >= elem.offset().left + elem.width();
        },
        rightTheScreen : function(elem){
            return (_window.width() + _window.scrollLeft()) <= elem.offset().left;
        },
        _lazyexecute : function(e){
            e.data.elems.each(function(){
                if( !$.aboveTheScreen(this) &&
                    !$.belowTheScreen(this) &&
                    !$.leftTheScreen(this) &&
                    !$.rightTheScreen(this) ) {
                    e.data.storeddata.callback.apply(this, e);
                }
            });
        },
        getLazyExecuteTargetElems : function(){
            var storedData = _window.data(dataStoreKey);
            if(!storedData){
                return [];
            }else{
                return storedData.elems;
            }
        },
        unbindLazyExecute : function(){
            _window.removeData(dataStoreKey);
            _window.unbind('scroll', this._lazyexecute);
        },
        bindLazyExecute : function(){
            var data = _window.data(dataStoreKey);
            var elems = $(data.elems);
            _window.bind('scroll', {storeddata:data, elems:elems}, this._lazyexecute);
            _window.trigger('scroll');
        }
    });
    $.fn.extend({
        lazyExecute : function(callback){
            var data = _window.data(dataStoreKey);
            if(!data){ data = {elems:[], callback:null}; }

            this.each(function(){
                data.elems.push($(this));
            });
            data.callback = callback;
            _window.data(dataStoreKey, data);
            $.bindLazyExecute();
            return this;
        }
    });
})(jQuery, window);

// Local Variables:
// indent-tabs-mode: nil
// tab-width: 4
// ruby-indent-level: 4
// End:
// vim: ts=4
