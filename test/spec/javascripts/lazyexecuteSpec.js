describe("lazyExecute", function() {
    describe("Accurate element count.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
        });
        it("1) should be target element is just one.", function() {
            var elemCnt = 0;
            $('div#jasmine-fixtures>div').lazyExecute(function(){
                elemCnt += 1;
            });
            expect(elemCnt).toEqual($.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(1);
            expect($.getLazyExecuteTargetElems().length).toEqual(1);
            $.unbindLazyExecute();
        });
        it("2) after unbind element count must be zero.", function() {
            $('div#jasmine-fixtures>div').lazyExecute(function(){
            });
            expect($.getLazyExecuteTargetElems().length).toEqual(1);
            $.unbindLazyExecute();
            expect($.getLazyExecuteTargetElems().length).toEqual(0);
        });
        it("3) should be target element is one, and trigger scroll event.", function() {
            var elemCnt = 0;
            $('div#jasmine-fixtures>div').lazyExecute(function(){
                elemCnt += 1;
            });
            $(window).trigger('scroll');
            expect($.getLazyExecuteTargetElems().length).toEqual(1);
            expect(elemCnt).toEqual(2);
            $.unbindLazyExecute();
        });
    });

    describe("The target element aboveTheScreen.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div').css({
                top:"-9999px"
            });
        });
        it("1) should be target element for execute is nothing.", function() {
            var elemCnt = 0;
            $('div#jasmine-fixtures>div').lazyExecute(function(){
                elemCnt += 1;
            });
            expect(elemCnt).toNotEqual($.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(0);
            expect($.getLazyExecuteTargetElems().length).toEqual(1);
            $.unbindLazyExecute();
        });
    });
    describe("The target element belowTheScreen.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div').css({
                top:"9999px"
            });
        });
        it("1) should be target element for execute is nothing.", function() {
            var elemCnt = 0;
            $('div#jasmine-fixtures>div').lazyExecute(function(){
                elemCnt += 1;
            });
            expect(elemCnt).toNotEqual($.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(0);
            expect($.getLazyExecuteTargetElems().length).toEqual(1);
            $.unbindLazyExecute();
        });
    });
    describe("The target element leftTheScreen.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div').css({
                left:"-9999px"
            });
        });
        it("1) should be target element for execute is nothing.", function() {
            var elemCnt = 0;
            $('div#jasmine-fixtures>div').lazyExecute(function(){
                elemCnt += 1;
            });
            expect(elemCnt).toNotEqual($.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(0);
            expect($.getLazyExecuteTargetElems().length).toEqual(1);
            $.unbindLazyExecute();
        });
    });
    describe("The target element rightTheScreen.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div').css({
                left:"9999px"
            });
        });
        it("1) should be target element for execute is nothing.", function() {
            var elemCnt = 0;
            $('div#jasmine-fixtures>div').lazyExecute(function(){
                elemCnt += 1;
            });
            expect(elemCnt).toNotEqual($.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(0);
            expect($.getLazyExecuteTargetElems().length).toEqual(1);
            $.unbindLazyExecute();
        });
    });
});
