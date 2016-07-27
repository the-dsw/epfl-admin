

const PAGE_NAME = {HOME:'home', LIST:'Users', ABOUT:'About', CONTACT:'ContactUs', SETTINGS_PROFILE:'Profile', SETTINGS_LANG:'Language'};

Template.layout.helpers({
    isLoggedIn() {
        return !!Meteor.userId();
    }
});

Template.nav.events({
    'click .list': (e) => {
        Session.set('page', 'LIST');
        e.preventDefault();
    },
    'click .about': (e) => {
        Session.set('page', 'ABOUT');
        e.preventDefault();
    },
    'click .contact': (e) => {
        Session.set('page', 'CONTACT');
        e.preventDefault();
    },
    'click a[name="settings-profile"]': (e) => {
        Session.set('page', 'SETTINGS_PROFILE');
        e.preventDefault();
    },
    'click a[name="settings-lang"]': (e) => {
        Session.set('page', 'SETTINGS_LANG');
        e.preventDefault();
    }
});

Template.nav.helpers({
    currentPage() {
        return PAGE_NAME[Session.get('page')];
    }
});

const mainAndNavHelpers = {
    pageIs(page) {
        Session.setDefault('page', 'HOME');
        return page === "SETTINGS"? Session.get('page').lastIndexOf('SETTINGS',0) === 0: Session.get('page') === page;
    }
};


Template.navContent.helpers(mainAndNavHelpers);
Template.main.helpers(mainAndNavHelpers);

if(Meteor.isClient){
    Template.nav.onRendered(() => {
        $('.collapsible').collapsible();
        $('.button-collapse').sideNav({
            closeOnClick: true
        });
        $('.settings-dropdown').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        });
    });
}


