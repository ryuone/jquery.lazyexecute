var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
(function(jQuery, window) {
  var LazyExecute, dataCache, dataStoreKey, elemEventContinue, elemEventStop, version, _window;
  dataStoreKey = "lazyExecute";
  _window = jQuery(window);
  dataCache = {};
  elemEventStop = "stop";
  elemEventContinue = "continue";
  version = "0.0.1";
  LazyExecute = (function() {
    function LazyExecute(datakey) {
      this.datakey = datakey;
      this.bindFunction = __bind(function() {
        return this._lazyexecute(this);
      }, this);
    }
    LazyExecute.prototype.version = function() {
      return version;
    };
    LazyExecute.prototype.aboveTheScreen = function(elem) {
      return _window.scrollTop() >= elem.offset().top + elem.height();
    };
    LazyExecute.prototype.belowTheScreen = function(elem) {
      return (_window.height() + _window.scrollTop()) <= elem.offset().top;
    };
    LazyExecute.prototype.leftTheScreen = function(elem) {
      return _window.scrollLeft() >= elem.offset().left + elem.width();
    };
    LazyExecute.prototype.rightTheScreen = function(elem) {
      return (_window.width() + _window.scrollLeft()) <= elem.offset().left;
    };
    LazyExecute.prototype._lazyexecute = function(e) {
      var data, self, stopflg;
      self = this;
      data = _window.data(this.datakey);
      stopflg = false;
      $(data.elems).each(function(index, elem) {
        var celem;
        celem = $(this);
        if (!self.aboveTheScreen(celem) && !self.belowTheScreen(celem) && !self.leftTheScreen(celem) && !self.rightTheScreen(celem)) {
          if (data.callback.apply(celem, e) === elemEventStop) {
            stopflg = true;
            return delete data.elems[index];
          }
        }
      });
      if (stopflg) {
        return this.stopExecute();
      }
    };
    LazyExecute.prototype.getLazyExecuteTargetElems = function() {
      var storedData;
      storedData = _window.data(this.datakey);
      if (!storedData) {
        return [];
      } else {
        return storedData.elems;
      }
    };
    LazyExecute.prototype.unbindLazyExecute = function() {
      delete dataCache[this.datakey];
      _window.removeData(this.datakey);
      return _window.unbind('scroll', this.bindFunction);
    };
    LazyExecute.prototype.bindLazyExecute = function() {
      _window.bind('scroll', this.bindFunction);
      return _window.trigger('scroll');
    };
    LazyExecute.prototype.stopExecute = function() {
      var data, len, _ref;
      data = _window.data(this.datakey).elems;
      for (len = _ref = data.length - 1; _ref <= 0 ? len <= 0 : len >= 0; _ref <= 0 ? len++ : len--) {
        if (!(data[len] != null)) {
          data.splice(len, 1);
        }
      }
      return null;
    };
    return LazyExecute;
  })();
  jQuery.fn.extend({
    lazyExecute: function() {
      var callback, data, datakey, lazyexecute;
      callback = arguments[0] || null;
      if (typeof callback === "function") {
        datakey = arguments[1] || dataStoreKey;
      }
      if (typeof callback !== "function") {
        callback = null;
        datakey = arguments[0] || dataStoreKey;
      }
      data = _window.data(datakey);
      if (!data) {
        data = {
          elems: [],
          callback: null
        };
      }
      this.each(function() {
        if ($.inArray(this, data.elems) === -1) {
          return data.elems.push(this);
        }
      });
      if (callback !== null && data.callback === null) {
        data.callback = callback;
      }
      _window.data(datakey, data);
      lazyexecute = dataCache[datakey];
      if (!lazyexecute) {
        lazyexecute = new LazyExecute(datakey);
        lazyexecute.bindLazyExecute();
        dataCache[datakey] = lazyexecute;
      }
      return lazyexecute;
    }
  });
  jQuery.extend(jQuery.fn.lazyExecute, {
    STOP: elemEventStop,
    CONTINUE: elemEventContinue
  });
  return null;
})(jQuery, window);