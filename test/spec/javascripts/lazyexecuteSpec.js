describe("lazyExecute", function() {
    beforeEach(function() {
        loadFixtures("lazyExecute.html");
        console.log("lazyExecute beforeEach");
        $('div#jasmine_content').append("<p class='tgt'>Test</p>").css("left","0");
    });
    afterEach(function() {
        console.log("lazyExecute afterEach");
        $('div#jasmine_content>p').remove();
    });

    it("1) should be able to play a Song", function() {
        $('div#jasmine_content>p').lazyExecute(function(){
            console.log("1)");
            console.log(this);
            expect($.nodeName(this[0], "p")).toBeTruthy();
        });
    });

    it("2) should be able to play a Song", function() {
        console.log("2)");
        expect(true).toBeTruthy();
    });

    describe("lazy!!",function(){
        beforeEach(function() {
            console.log("lazy!! beforeEach");
        });
        afterEach(function() {
            console.log("lazy!! afterEach");
        });
        it("1111", function() {
            var x = 100;
            expect(x).toEqual(100);
        });
    });
});
