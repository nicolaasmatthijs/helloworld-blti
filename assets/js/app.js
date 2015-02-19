(function() {
    var app = angular.module('store', []);

    var gems = [
        {
            'name': 'Shop-Vac 9650600 3.0-Peak HP Pro Series Wet or Dry Vacuum',
            'price': 58.99,
            'description': 'Shop-Vac 6-Gallon 3.0-Peak HP Pro Series Wet/Dry Vac. Comes with versatile accessory assortment that includes 8-foot by 1 1/4-Inch LockOn(r) Hose, 3 1 1/4-Inch Extension Wands, 10-Inch Wet/Dry Nozzle, 1-1/4-Inch Crevice Tool, 1-1/4-Inch Gulper Nozzle. Filters included are the cartridge filter with retainer and a disposable filter bag. Comes with a 6-foot power cord, side tank handles and top carry handle. Has a 3 year warranty and is assembled in the U.S.A. This can be used for wet pickup in garages or basements. Dry pickup in workshops, basements and vehicle clean up.',
            'images': [
                {
                    'full': 'http://ecx.images-amazon.com/images/I/81v-jvQR5cL._SL1500_.jpg',
                    'thumb': 'http://ecx.images-amazon.com/images/I/41O%2BlvT3-mL._AA50_.jpg'
                },
                {
                    'full': 'http://ecx.images-amazon.com/images/I/71AGd3BXA5L._SL1500_.jpg',
                    'thumb': 'http://ecx.images-amazon.com/images/I/410yw4O89HL._AA50_.jpg'
                },
                {
                    'full': 'http://ecx.images-amazon.com/images/I/91L%2BcPWielL._SL1500_.jpg',
                    'thumb': 'http://ecx.images-amazon.com/images/I/51Hfw7o5EIL._AA50_.jpg'
                },
                {
                    'full': 'http://ecx.images-amazon.com/images/I/91yp1ESw95L._SL1500_.jpg',
                    'thumb': 'http://ecx.images-amazon.com/images/I/51Hfw7o5EIL._AA50_.jpg'
                }
            ],
            'reviews': [
                {
                    'stars': 2,
                    'body': 'You Can Do Better',
                    'author': 'Pati Morris'
                }
            ],
            'canPurchase': true,
            'soldOut': false
        },
        {
            'name': 'Fitbit Flex Wireless Activity + Sleep Wristband',
            'price': 95,
            'description': 'Never stop moving with Fitbit Flex. Wear this slim, stylish device all the time and get the motivation you need to get out and be more active. It tracks steps, distance, and calories burned and shows you how you\'re stacking up against your daily goals. At night, it tracks your sleep cycle, helps you learn how to sleep better, and wakes you silently in the morning. Access your stats anytime on your computer, tablet or from leading smartphones – both iPhone and Android. Flex is your perfect companion, it\'s with you everywhere...even in the shower. Plus, it looks good no matter what you\'re wearing.',
            'images': [
                {
                    'full': 'http://ecx.images-amazon.com/images/I/61YRYwYtSJL._SL1500_.jpg',
                    'thumb': 'http://ecx.images-amazon.com/images/I/21ukcP7LNVL._AA50_.jpg'
                },
                {
                    'full': 'http://ecx.images-amazon.com/images/I/21ukcP7LNVL._AA50_.jpg',
                    'thumb': 'http://ecx.images-amazon.com/images/I/21ukcP7LNVL._AA50_.jpg'
                }
            ],
            'reviews': [
                {
                    'stars': 3,
                    'body': 'Well, if the the Flex WINS the \'Fight\' over the Up, you\'d better read this...',
                    'author': 'D. Graves'
                },
                {
                    'stars': 4,
                    'body': 'Jawbone UP vs Fitbit Flex -- Fight!',
                    'author': 'RST_'
                }
            ],
            'canPurchase': false,
            'soldOut': false
        },
        {
            'name': 'UCO Clarus 150 Lumen LED Mini Lantern',
            'price': 10.27,
            'description': 'The UCO Clarus LED Lantern is a compact and collapsible mini lantern that provides up to 150 lumens of light that is comfortable to read by. Pull up on the frosted globe of the Clarus for use as a lantern and push back down for a flashlight mode when you need more focused lighting. The on/off button also serves as a control over the brightness of the lantern: just click the button and it will switch between three levels of lighting. The Clarus can also be used as a strobe light for emergency situations.',
            'images': [
                {
                    'full': 'http://ecx.images-amazon.com/images/I/61x60RuZmjL._SL1500_.jpg',
                    'thumb': 'http://ecx.images-amazon.com/images/I/31vag74RD0L._AA50_.jpg'
                }
            ],
            'reviews': [
                {
                    'stars': 5,
                    'body': 'The holy grail of LED lanterns!',
                    'author': 'Eroc'
                },
                {
                    'stars': 4,
                    'body': 'There will always be a brighter lantern....',
                    'author': 'smartydog904'
                },
                {
                    'stars': 5,
                    'body': 'Great for camping as well as daily use',
                    'author': 'NYnurse'
                }
            ],
            'canPurchase': true,
            'soldOut': false
        }
    ];

    app.controller('StoreController', function() {
        this.products = gems;
    });

    app.controller('ReviewController', function() {
        this.review = {};

        this.addReview = function(product) {
            product.reviews.push(this.review);
            this.review = {};
        };
    });

    app.directive('product', function() {
        return {
            'restrict': 'E',
            'templateUrl': 'product.html'
        };
    });

    app.directive('rating', function() {
        return {
            'restrict': 'E',
            'templateUrl': 'rating.html',
            'scope': { 'stars': '=stars' }
        };
    });

})();
