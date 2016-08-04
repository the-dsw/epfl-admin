
Lists = new Meteor.Collection("lists");

Meteor.subscribe('Lists');

Template.list.rendered = function() {
    $('.user_form').hide();
}

Template.listUsersAdded.rendered = function() {
    $('.tbUsers').show();
}

Template.list.events({
    'click .new_user': function() {
        $('.user_form').toggle();
        $('.new_user').hide();
        $('.tbUsers').hide();
    },
    'click .show_user':function() {
        $('.tbUsers').toggle();
    },
    'submit .list': function(e){
        // Prevent default browser form submit
        e.preventDefault();

            // Get value from form element
        const target = e.target;
        const firstName = target.firstName.value;
        const lastName = target.lastName.value;
        const password = target.password.value;
        const email = target.email.value;

        if(firstName === '' && lastName === '' && password === '' && email === ''){
            alert("TODO: no submitting empty form");
            return;
        }



        Lists.insert({
            firstNameUser: target.firstName.value,
            lastNameUser: target.lastName.value,
            passwordUser: target.password.value,
            emailUser: target.email.value,
            createdAt: new Date(),
            updatedAt: null
        }, function (err){
            toast(firstName, lastName, Template.listUsers$toastInserted, err);
        });


        // Clear form
        target.firstName.value = '';
        target.lastName.value = '';
        target.password.value = '';
        target.email.value = '';

        $('.user_form').hide();
        $('.new_user').show();
        $('.tbUsers').show();

        return false;
    }
});

Template.list.helpers({
    title: function() {
        return "Add User";
    }
});

Template.listUsersAdded.helpers({
    list: function () {
        return Lists.find().fetch();
    },
    title: function() {
        return "List Users";
    },
    editing: function(){
        return Session.equals('editItemId', this._id);
    }
});

Template.listUsersAdded.events({
    'click .deleteItem': function() {
        // delete user from list
        Lists.remove(this._id);
        toastDelete();
        return false;
    },
    'click .editItem': function() {

        Session.set('editItemId', this._id);
        return false;

    },
    'click .cancelItem': function(){
        Session.set('editItemId', null);
        return false;
    },
    'click .saveItem': function(){
        saveEdit();


        return false;
    },
    'keypress input': function(e) {
        // When a user presses enter let’s save the changes
        if (e.keyCode === 13) {
            saveEdit();

        }
    }


});

// ========= Functions =======================================

function saveEdit(){
    var firstName = $("#editFirstName").val();
    var lasttName = $("#editLastName").val();
    var editItem = {
        firstNameUser: firstName,
        lastNameUser: lasttName,
        passwordUser: $("#editPassword").val(),
        emailUser: $("#editEmail").val(),
        updatedAt: new Date()
    }

    Lists.update(Session.get('editItemId'), {$set: editItem}, {},
        _.bind(toast, {}, firstName, lasttName, Template.listUsers$toastEdited)); // Bind a function to an object, meaning that whenever the function is called, the value of this will be the object.
    Session.set('editItemId', null);
}


// Message user deleted successfully
function toastDelete(){
    var $toastContent = $('<span>User deleted successfully</span>');
    Materialize.toast($toastContent, 5000);
}

function toast(firstName, lastName, template, err){
    var toastTemplateArgs;
    if (err) {
        toastTemplateArgs = {error: err};
    } else {
        toastTemplateArgs = {
            firstName: firstName,
            lastName: lastName
        };
    }
    var $toastContent = Blaze.toHTMLWithData(template, toastTemplateArgs);
    Materialize.toast($toastContent, 5000);
}

