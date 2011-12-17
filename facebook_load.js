var loadFacebookAccount = function(facebook_details, callback) {
   turbulence.queryAgent('agent_person', { 'username': facebook_details.user.username }, function(err, account) {
       if(err) callback(err);
       else {

       if(account) {
          console.log(account.data.content.username + ' just logged in.');
           callback(null, account);
       }
       else {
           // create a user from the facebook details
           var user = {
               data: {
                   agentType: 'agent_person',
                   content: {
                       username: facebook_details.user.username,
                       firstName: facebook_details.user.first_name,
                       lastName: facebook_details.user.last_name,
                       gender: facebook_details.user.gender,
                       identities: [
                                    { key: 'email', val: facebook_details.user.email },
                                    { key: 'facebook', val: facebook_details.user.id }
                                   ]
                   }
               }
           };

           turbulence.registerAgent(user, function(err, userId) {
               if(err)  callback(err);
               else {
                   console.log('registered agent');
                   user._id = userId;
                   callback(null, user);
               }
           });
       }
       
       } // end first else
   });
};

loadAccount = function(req, loadCallback) {
    if(req.isAuthenticated()) {
        // load account out of database
        if(req.getAuthDetails().user.id) {
            // its a facebook login, try and grab outta db otherwise make a user off fb creds
            var fb_details = req.getAuthDetails();
            loadFacebookAccount(fb_details, loadCallback);
        }
    }
    else {
        loadCallback(null, null);
    }
}

