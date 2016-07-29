
Lists = new Meteor.Collection("lists");

Meteor.subscribe('Lists');

Template.list.rendered = function() {
    $('.user_form').hide();
}

Template.listUsersAdded.rendered = function() {
    $('.tbUsers').hide();
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
        const first_name = target.firstName.value;
        const last_name = target.lastName.value;
        const password = target.password.value;
        const email = target.email.value;

        // Message user added successfully
        function toast(){
            var $toastContent = $('<span>User added successfully</span>');
            Materialize.toast($toastContent, 5000);
        }

        if(first_name === '' && last_name === '' && password === '' && email === ''){

        } else {
            Lists.insert({
                firstNameUser: target.firstName.value,
                lastNameUser: target.lastName.value,
                passwordUser: target.password.value,
                emailUser: target.email.value,
                createdAt: new Date(),
                updatedAt: null
            });

            toast();

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
    }
});

Template.list.helpers({
    title: function() {
        return "Add User";
    }
});

Template.listUsersAdded.helpers({
    list: function () {
        return Lists.find();
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
        // Message user deleted successfully
        function toastDelete(){
            var $toastContent = $('<span>User deleted successfully</span>');
            Materialize.toast($toastContent, 5000);
        }
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
        saveItem();
        toastEdit();

        return false;
    },
    'keypress input': function(e) {
        // When a user presses enter let’s save the changes
        if (e.keyCode === 13) {
            saveItem();
            toastEdit();
        }
    }


});

// ========= Functions =======================================

var saveItem = function(){
    var editItem = {
        firstNameUser: $("#editFirstName").val(),
        lastNameUser: $("#editLastName").val(),
        passwordUser: $("#editPassword").val(),
        emailUser: $("#editEmail").val(),
        updatedAt: new Date()
    }

    Lists.update(Session.get('editItemId'), {$set: editItem});
    Session.set('editItemId', null);
}

// Message user edited successfully
function toastEdit(){
    var $toastContent = $('<span>User edited successfully</span>');
    Materialize.toast($toastContent, 5000);
}


