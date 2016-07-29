import { Meteor } from 'meteor/meteor';
Lists = new Meteor.Collection('lists');

Meteor.publish('Lists', function(){
    return Lists.find({}, { sort: {lastNameUser: 1} });
});

Meteor.startup(() => {
  // code to run on server at startup
    process.env.MAIL_URL = "smtp://<your-email>:<your-password>@smtp.gmail.com:587";

});

Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
});

Lists.allow({
    insert: function () {
        return true;
    },
    remove: function (){
        return true;
    },

    update: function() {
        return true;
    }
});