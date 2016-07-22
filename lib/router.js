Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.render('home');
});

Router.route('/list', function () {
    this.render('list');
});

Router.route('/about', function () {
    this.render('about');
});

Router.route('/contact', function () {
    this.render('contact');
});

Router.route('/profile', function () {
    this.render('profile');
});