app.post('/howl', function(req, res) {
    loadAccount(req, function(err, account) {
        if(err) console.log(err);
        else {
        if(account && account.data.content.username) {
            
            // abuse tags for storing user information
            var howl = {
                authorAgent: account._id,
                visibility: 'public',
                data: {
                    postType: 'post_status',
                    content: {
                        text: req.body.howl,
                        tags: [account.data.content.username, account.data.content.firstName, account.data.content.lastName]
                    }
                }
            };
            
            turbulence.publishPost(howl, function(err, postId) {
                if(err) {
                    console.log(err.message);
                    res.redirect('/');
                }
                else {
                    howl._id = postId;
                    res.redirect('/');
                }
            });
        }

        } // end first else
    });
});
