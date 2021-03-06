describe("lazyExecute", function() {
    describe("Accurate element count.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div').css({
                marginTop:"5000px"
            });
            document.documentElement.scrollTop = 9999;
        });
        it("1) should be target element is just one.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute(function(){
                elemCnt += 1;
            });
            console.log("elemCnt ->" + elemCnt);
            console.log($('div#jasmine-fixtures>div div'));
            expect(elemCnt).toEqual(lze.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(1);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
        it("2) after unbind element count must be zero.", function() {
            var lzeA, lzeB;
            lzeA = $('div#jasmine-fixtures>div div').lazyExecute(function(){
            });
            expect(lzeA.getLazyExecuteTargetElems().length).toEqual(1);

            lzeB = $('div#jasmine-fixtures>div div').lazyExecute(function(){
            });
            expect(lzeB.getLazyExecuteTargetElems().length).toEqual(1);
            expect(lzeA).toEqual(lzeB);

            lzeA.unbindLazyExecute();
            expect(lzeA.getLazyExecuteTargetElems().length).toEqual(0);
            expect(lzeB.getLazyExecuteTargetElems().length).toEqual(0);
        });
        it("3) should be target element is one, and trigger scroll event.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute(function(){
                elemCnt += 1;
            });
            $(window).trigger('scroll');
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            expect(elemCnt).toEqual(2);
            lze.unbindLazyExecute();
        });
    });

    describe("The target element aboveTheScreen.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div div').css({
                top:"-9999px"
            });
        });
        it("1) should be target element for execute is nothing.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute(function(){
                elemCnt += 1;
            });
            expect(elemCnt).toNotEqual(lze.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(0);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
    });
    describe("The target element belowTheScreen.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div div').css({
                top:"9999px"
            });
            $('div#jasmine-fixtures>div').css({
                marginTop:"5000px"
            });
            document.documentElement.scrollTop = 9999;
        });
        it("1) should be target element for execute is nothing.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute(function(){
                elemCnt += 1;
            });
            expect(elemCnt).toNotEqual(lze.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(0);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
    });
    describe("The target element leftTheScreen.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div div').css({
                left:"-9999px"
            });
            $('div#jasmine-fixtures>div').css({
                marginTop:"5000px"
            });
            document.documentElement.scrollTop = 9999;
        });
        it("1) should be target element for execute is nothing.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute(function(){
                elemCnt += 1;
            });
            expect(elemCnt).toNotEqual(lze.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(0);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
    });
    describe("The target element rightTheScreen.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div div').css({
                left:"9999px"
            });
            $('div#jasmine-fixtures>div').css({
                marginTop:"5000px"
            });
            document.documentElement.scrollTop = 9999;
        });
        it("1) should be target element for execute is nothing.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute(function(){
                elemCnt += 1;
            });
            expect(elemCnt).toNotEqual(lze.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(0);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
    });
    describe("The target 2 element in the screen.",function(){
        beforeEach(function(){
            loadFixtures("lazyExecute2Elem.html");
            $('div#jasmine-fixtures>div').css({
                marginTop:"5000px"
            });
            document.documentElement.scrollTop = 9999;
        });
        it("1) should be target element for execute is nothing.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute(function(){
                elemCnt += 1;
                if(elemCnt === 1){
                    return this.lazyExecute.STOP;
                }
                return this.lazyExecute.CONTINUE;
            });
            expect(elemCnt).toEqual(2);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
    });
    describe("The target 3 element in the screen.",function(){
        beforeEach(function(){
            loadFixtures("lazyExecute3Elem.html");
            $('div#jasmine-fixtures>div').css({
                marginTop:"5000px"
            });
            document.documentElement.scrollTop = 9999;
        });
        it("1) should be target element for execute is nothing.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute(function(){
                elemCnt += 1;
                if(elemCnt === 1 || elemCnt === 3){
                    return this.lazyExecute.STOP;
                }
                return this.lazyExecute.CONTINUE;
            }, "threeElems");
            expect(elemCnt).toEqual(3);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
    });
});
describe("lazyExecute(InDisplayArea)", function() {
    describe("Accurate execute count.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div').css({
                marginTop:"5000px"
            });
            document.documentElement.scrollTop = 9999;
        });
        it("1) should be target element is just one.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute($.lazyExecute.InDisplayArea, function(){
                elemCnt += 1;
            });
            expect(elemCnt).toEqual(lze.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(1);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
    });
});
describe("lazyExecute(OutDisplayArea)", function() {
    describe("Accurate execute count.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div').css({
                marginTop:"5000px"
            });
            document.documentElement.scrollTop = 0;
        });
        it("1) should be target element is just one.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute($.lazyExecute.OutDisplayArea, function(){
                elemCnt += 1;
            });
            expect(elemCnt).toEqual(lze.getLazyExecuteTargetElems().length);
            expect(elemCnt).toEqual(1);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
    });
});
describe("lazyExecute(EnterDisplayArea)", function() {
    describe("Accurate execute count.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div').css({
                marginTop:"5000px"
            });
            document.documentElement.scrollTop = 0;
        });
        it("1) A element is not in the display area.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute($.lazyExecute.EnterDisplayArea, function(){
                elemCnt += 1;
            });
            $(window).trigger("scroll");

            expect(elemCnt).toEqual(0);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
        it("2) A element enter the display area.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute($.lazyExecute.EnterDisplayArea, function(){
                elemCnt += 1;
            });
            document.documentElement.scrollTop = 9999;
            $(window).trigger("scroll");

            expect(elemCnt).toEqual(1);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
        it("3) A element go in and go out of display area.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute($.lazyExecute.EnterDisplayArea, function(){
                elemCnt += 1;
            });
            document.documentElement.scrollTop = 9999;
            $(window).trigger("scroll");
            document.documentElement.scrollTop = 0;
            $(window).trigger("scroll");

            expect(elemCnt).toEqual(1);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
        it("4) A element go in and out and in display area.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute($.lazyExecute.EnterDisplayArea, function(){
                elemCnt += 1;
            });
            document.documentElement.scrollTop = 9999;
            $(window).trigger("scroll");
            document.documentElement.scrollTop = 0;
            $(window).trigger("scroll");
            document.documentElement.scrollTop = 9999;
            $(window).trigger("scroll");

            expect(elemCnt).toEqual(2);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
    });
});
describe("lazyExecute(LeaveDisplayArea)", function() {
    describe("Accurate execute count.",function(){
        beforeEach(function() {
            loadFixtures("lazyExecute.html");
            $('div#jasmine-fixtures>div').css({
                marginTop:"5000px"
            });
            document.documentElement.scrollTop = 0;
        });
        it("1) A element is not in the display area.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute($.lazyExecute.LeaveDisplayArea, function(){
                elemCnt += 1;
            });
            $(window).trigger("scroll");

            expect(elemCnt).toEqual(1);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
        it("2) A element enter the display area.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute($.lazyExecute.LeaveDisplayArea, function(){
                elemCnt += 1;
            });
            document.documentElement.scrollTop = 9999;
            $(window).trigger("scroll");

            expect(elemCnt).toEqual(1);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
        it("3) A element go in and go out of display area.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute($.lazyExecute.LeaveDisplayArea, function(){
                elemCnt += 1;
            });
            document.documentElement.scrollTop = 9999;
            $(window).trigger("scroll");
            document.documentElement.scrollTop = 0;
            $(window).trigger("scroll");

            expect(elemCnt).toEqual(2);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
        it("4) A element go in and out and in display area.", function() {
            var elemCnt = 0;
            var lze = $('div#jasmine-fixtures>div div').lazyExecute($.lazyExecute.LeaveDisplayArea, function(){
                elemCnt += 1;
            });
            document.documentElement.scrollTop = 9999;
            $(window).trigger("scroll");
            document.documentElement.scrollTop = 0;
            $(window).trigger("scroll");
            document.documentElement.scrollTop = 9999;
            $(window).trigger("scroll");

            expect(elemCnt).toEqual(2);
            expect(lze.getLazyExecuteTargetElems().length).toEqual(1);
            lze.unbindLazyExecute();
        });
    });
});
