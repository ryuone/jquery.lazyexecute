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
    var dataCache = {};
    var elemEventStop = "stop";
    var elemEventContinue = "continue";
    var version = "0.0.1";

    var LazyExecute = function(datakey){
        this.datakey = datakey;
        this.bindFunction = Function.bind ? this._lazyexecute.bind(this) : (function(fn,self){
            return function(){fn.apply(self, arguments);};
        }(this._lazyexecute, this));
    };
    LazyExecute.prototype = {
        version : function(){
            return version;
        },
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
            var self = this;
            var data = _window.data(this.datakey);
            var stopflg = false;
            $(data.elems).each(function(index, elem){
                var celem = $(this);
                if( !self.aboveTheScreen(celem) &&
                    !self.belowTheScreen(celem) &&
                    !self.leftTheScreen(celem) &&
                    !self.rightTheScreen(celem) ) {
                    if( data.callback.apply(celem, e) === elemEventStop ){
                        stopflg = true;
                        delete data.elems[index];
                    }
                }
            });
            if(stopflg){
                this.stopExecute();
            }
        },
        getLazyExecuteTargetElems : function(){
            var storedData = _window.data(this.datakey);
            if(!storedData){
                return [];
            }else{
                return storedData.elems;
            }
        },
        unbindLazyExecute : function(){
            delete dataCache[this.datakey];
            _window.removeData(this.datakey);
            _window.unbind('scroll', this.bindFunction);
        },
        bindLazyExecute : function(){
            _window.bind('scroll', this.bindFunction);
            _window.trigger('scroll');
        },
        stopExecute : function(){
            var data = _window.data(this.datakey).elems;

            for(var len=data.length-1; len>=0; len--){
                if(data[len] == null){
                    data.splice(len,1);
                }
            }
        }
    };

    $.fn.extend({
        lazyExecute : function(){
            var callback = arguments[0] || null, datakey;
            if(typeof callback === "function"){
                datakey  = arguments[1] || dataStoreKey;
            }
            if(typeof callback !== "function"){
                callback = null;
                datakey  = arguments[0] || dataStoreKey;
            }

            var data = _window.data(datakey);
            if(!data){ data = {elems:[], callback:null};}

            this.each(function(){
                if($.inArray(this, data.elems) === -1){
                    data.elems.push(this);
                }
            });
            if(callback !== null && data.callback === null){
                data.callback = callback;
            }
            _window.data(datakey, data);

            var lazyexecute = dataCache[datakey];
            if(!lazyexecute){
                lazyexecute = new LazyExecute(datakey);
                lazyexecute.bindLazyExecute();
                dataCache[datakey] = lazyexecute;
            }
            return lazyexecute;
        }
    });
    $.extend($.fn.lazyExecute,{
        STOP: elemEventStop,
        CONTINUE: elemEventContinue
    });
})(jQuery, window);

// Local Variables:
// indent-tabs-mode: nil
// tab-width: 4
// ruby-indent-level: 4
// End:
// vim: ts=4
