(function(jQuery, window) {
  var dataStoreKey, _window;
  dataStoreKey = "lazyExecute";
  _window = jQuery(window);
  jQuery.extend({
    aboveTheScreen: function(elem) {
      return _window.scrollTop() >= elem.offset().top + elem.height();
    },
    belowTheScreen: function(elem) {
      return (_window.height() + _window.scrollTop()) <= elem.offset().top;
    },
    leftTheScreen: function(elem) {
      return _window.scrollLeft() >= elem.offset().left + elem.width();
    },
    rightTheScreen: function(elem) {
      return (_window.width() + _window.scrollLeft()) <= elem.offset().left;
    },
    _lazyexecute: function(e) {
      return e.data.elems.each(function() {
        if (!$.aboveTheScreen(this) && !$.belowTheScreen(this) && !$.leftTheScreen(this) && !$.rightTheScreen(this)) {
          return e.data.storeddata.callback.apply(this, e);
        }
      });
    },
    getLazyExecuteTargetElems: function() {
      var storedData;
      storedData = _window.data(dataStoreKey);
      if (!storedData) {
        return [];
      } else {
        return storedData.elems;
      }
    },
    unbindLazyExecute: function() {
      _window.removeData(dataStoreKey);
      return _window.unbind('scroll', this._lazyexecute);
    },
    bindLazyExecute: function() {
      var data, elems;
      data = _window.data(dataStoreKey);
      elems = $(data.elems);
      _window.bind('scroll', {
        storeddata: data,
        elems: elems
      }, this._lazyexecute);
      _window.trigger('scroll');
      return null;
    }
  });
  jQuery.fn.extend({
    lazyExecute: function(callback) {
      var data;
      data = _window.data(dataStoreKey);
      if (!data) {
        data = {
          elems: [],
          callback: null
        };
      }
      this.each(function() {
        return data.elems.push($(this));
      });
      data.callback = callback;
      _window.data(dataStoreKey, data);
      $.bindLazyExecute();
      return this;
    }
  });
  return null;
})(jQuery, window);