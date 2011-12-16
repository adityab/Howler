app.post('/howl', function(req, res) {
    loadAccount(req, function(err, account) {
        if(err) console.log(err);
        else {
        if(account && account.data.content.username) {

            var howl = {
                authorAgent: account._id,
                visibility: 'public',
                data: {
                    postType: 'post_status',
                    content: {
                        text: req.body.howl
                    }
                }
            };
            
            turbulence.publishPost(howl, function(err, postId) {
                if(err) callback(err);
                else {
                    howl._id = postId;
                    res.redirect('/');
                }
            });
        }

        } // end first else
    });
});
