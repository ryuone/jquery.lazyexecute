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
    var __bind = function(fn,self){
        return function(){fn.apply(self, arguments);};
    };
    var stopflg;

    var LazyExecute = function(lazyExecuteType, datakey){
        this.lazyExecuteType = lazyExecuteType;
        this.datakey = datakey;
        this.bindFunction = Function.bind ? this.callbackExecute.bind(this) : __bind(this.callbackExecute, this);
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
        isInDisplayArea : function(self, celem){
            if( !self.aboveTheScreen(celem) &&
                !self.belowTheScreen(celem) &&
                !self.leftTheScreen(celem) &&
                !self.rightTheScreen(celem) ) {
                return true;
            }
            return false;
        },
        procEnterDisplayArea : function(self, celem, data, e, index){
            if( self.isInDisplayArea(self, celem) === true &&
                (data.posState[index] === null || data.posState[index] === false)){
                if( data.callback.apply(celem, e) === elemEventStop ){
                    stopflg = true;
                    delete data.elems[index];
                }
                data.posState[index] = true;
            }else{
                data.posState[index] = false;
            }
        },
        procLeaveDisplayArea : function(self, celem, data, e, index){
            if( self.isInDisplayArea(self, celem) !== true &&
                (data.posState[index] === null || data.posState[index] === true)){
                if( data.callback.apply(celem, e) === elemEventStop ){
                    stopflg = true;
                    delete data.elems[index];
                }
                data.posState[index] = false;
            }else{
                data.posState[index] = true;
            }
        },
        procInDisplayArea : function(self, celem, data, e, index){
            if( self.isInDisplayArea(self, celem) === true ){
                if( data.callback.apply(celem, e) === elemEventStop ){
                    stopflg = true;
                    delete data.elems[index];
                }
                data.posState[index] = true;
            }else{
                data.posState[index] = false;
            }
        },
        procOutDisplayArea : function(self, celem, data, e, index){
            if( self.isInDisplayArea(self, celem) !== true ){
                if( data.callback.apply(celem, e) === elemEventStop ){
                    stopflg = true;
                    delete data.elems[index];
                }
                data.posState[index] = false;
            }else{
                data.posState[index] = true;
            }
        },
        callbackExecute : function(e){
            var self = this;
            var data = _window.data(this.datakey);
            stopflg = false;
            $(data.elems).each(function(index, elem){
                var celem = $(this);
                switch(self.lazyExecuteType){
                  case $.lazyExecute.EnterDisplayArea:
                    self.procEnterDisplayArea(self, celem, data, e, index);
                    break;
                  case $.lazyExecute.LeaveDisplayArea:
                    self.procLeaveDisplayArea(self, celem, data, e, index);
                    break;
                  case $.lazyExecute.InDisplayArea:
                    self.procInDisplayArea(self, celem, data, e, index);
                    break;
                  case $.lazyExecute.OutDisplayArea:
                    self.procOutDisplayArea(self, celem, data, e, index);
                    break;
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

    $.extend({
        lazyExecute : {
            LeaveDisplayArea  : "LeaveDisplayArea",
            EnterDisplayArea  : "EnterDisplayArea",
            InDisplayArea     : "InDisplayArea",
            OutDisplayArea    : "OutDisplayArea"
        }
    });

    $.fn.extend({
        lazyExecute : function(){
            var callback, datakey,i,
                lazyExecuteType = arguments[0];

            switch(lazyExecuteType){
              case $.lazyExecute.LeaveDisplayArea:
              case $.lazyExecute.EnterDisplayArea:
              case $.lazyExecute.InDisplayArea:
              case $.lazyExecute.OutDisplayArea:
                i = 1;
                break;
            default:
                i = 0;
                lazyExecuteType = $.lazyExecute.InDisplayArea;
                break;
            }
            callback = arguments[i] || null;
            if(typeof callback === "function"){
                datakey  = arguments[i+1] || dataStoreKey;
            }
            if(typeof callback !== "function"){
                callback = null;
                datakey  = arguments[i] || dataStoreKey;
            }

            var data = _window.data(datakey);
            if(!data){ data = {elems:[], callback:null, posState:[]};}

            this.each(function(){
                if($.inArray(this, data.elems) === -1){
                    data.elems.push(this);
                    data.posState.push(null);
                }
            });
            if(callback !== null && data.callback === null){
                data.callback = callback;
            }
            _window.data(datakey, data);

            var lazyexecute = dataCache[datakey];
            if(!lazyexecute){
                lazyexecute = new LazyExecute(lazyExecuteType, datakey);
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
