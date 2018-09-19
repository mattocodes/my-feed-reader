/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    /** RSS Feeds test suite */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /** 
         * Loops through each feed in the allFeed object and ensures 
         * that it has a URL defined and that the URL is not empty
        */
        it('url property are defined & not empty', function(){
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });
        
        /** 
         * Loops through each feed in the allFeeds object and ensures 
         * it has a name defined and that the name is not empty. 
        */
        it('name property are defined & not empty', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
            
        });

    });

    /** The Menu test suite */
    describe('The Menu', function() {
       
        /** 
         * Ensures that the menu element is hidden by default
        */
        it('by default is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });

        /** 
         * Ensures that the menu changes visibility when the 
         * menu icon is clicked 
         */
         it('changes visibility when menu icon is clicked', 
            function() {
                let menuIcon, menuState;

                menuIcon = $('.menu-icon-link');
                menuIcon.click();   // on click, menu becomes visible
                menuState = $('body').hasClass('menu-hidden');
                expect(menuState).toBe(false); 

                menuIcon.click();   // on second click, menu becomes hidden
                menuState = $('body').hasClass('menu-hidden');
                expect(menuState).toBe(true);                   
            });

    });


    /** Initial Entries test suite */
    describe('Initial Entries', function() {
        let entry;
        beforeEach(function(done) {
            loadFeed(0, function() {
                entry = $('.feed .entry');
                done();
            });
        });

        /**
         * Ensures that the feed container has at least one entry
         */
        it('feed container should have at least one entry', function() {
            expect(entry.length).toBeGreaterThan(0);
        });

    });
    

    /** New Feed Selection test suite */
    describe('New Feed Selection', function() {
        let firstFeed, secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                // first feed
                firstFeed = $('.feed').html();

                loadFeed(1, function() {
                    // second feed 
                    secondFeed = $('.feed').html();
                    done();
                });
            });

        });

        /**
         * Ensures that the content of each feed changes when 
         * a new feed is loaded by the loadFeed function
         */
        it('contents of each feed should be different', function() {
            expect(firstFeed).not.toMatch(secondFeed);
        });
    });

}());
