/**
 * Created by the-dsw on 21.07.16.
 */

Template.contact.events({
    'submit .contact': function(e){
        // Prevent default browser form submit
        e.preventDefault();

        // Get value from form element
        const target = e.target;
        const account = target.account.value;
        const email = target.email.value;
        const message = target.message.value;
        const subject = 'Hello from Meteor!';
        const to = ''; // your email
        const text = "name: " + account + "\n email: " + email + "\n message: " + message;

        // Message successfully
        function toast(){
            var $toastContent = $('<span>Message sent successfully</span>');
            Materialize.toast($toastContent, 5000);
        }

        if(account === '' && email === '' && message === ''){
            alert("TODO: no submitting empty form");
            return;
        }

        toast();
        // asynchronously send an email
        Meteor.call(
            'sendEmail',
            to,
            email,
            subject,
            text
        );

        // Clear form
        target.account.value = '';
        target.email.value = '';
        target.message.value = '';

        return false;



    }
});

