import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    process.env.MAIL_URL = "smtp://fmod31@gmail.com:phsncdrichnqiopg@smtp.gmail.com:587";

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