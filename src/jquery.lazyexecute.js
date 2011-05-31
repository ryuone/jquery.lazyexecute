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
            var top = _window.scrollTop();
            return top >= elem.offset().top + elem.height();
        },
        belowTheScreen : function(elem){
            var bottom = _window.height() + _window.scrollTop();
            return bottom <= elem.offset().top;
        },
        leftTheScreen : function(elem){
            var left = _window.scrollLeft();
            return left >= elem.offset().left + elem.width();
        },
        rightTheScreen : function(elem){
            var right = _window.width() + _window.scrollLeft();
            return right <= elem.offset().left;
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
        unbindLazyExecute : function(){
            var data = $(window).data(dataStoreKey);
        },
        bindLazyExecute : function(){
            var data = $(window).data(dataStoreKey);
            var elems = $(data.elems);
            $(window).bind('scroll', {storeddata:data, elems:elems}, this._lazyexecute);
            $(window).trigger('scroll');
        }
    });
    $.fn.extend({
        lazyExecute : function(callback){
            var data = $(window).data(dataStoreKey);
            if(!data){ data = {elems:[], callback:null}; }

            this.each(function(){
                data.elems.push($(this));
            });
            data.callback = callback;
            $(window).data(dataStoreKey, data);
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
