beforeEach(function() {
  this.addMatchers({
    toBePElem: function() {
      return 'p' === this.actual.nodeName.toLowerCase();
    }
  });
});
