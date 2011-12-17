app.get('/:username', function(req, res) {
    loadAccount(req, function(err, account) {
        if(err) console.log(err);
        else {
            turbulence.queryAgent('agent_person', {username: req.params.username}, function(err, user) {
                if(err) console.log(err);
                else {
                    if(!user)
                        console.log('could not find user');
                    else {
                        var howls_per_page = 100;
                        turbulence.queryPost(
                            {authorAgent: user._id},
                            {sort: [['date', 'descending']], limit: howls_per_page},
                            function(err, howls) {
                                if(err) console.log(err.message);
                                else {
                                    res.local('user', user);
                                    res.local('howls', howls);
                                    res.local('account', account);
                                    res.local('title', 'Howler - ' + req.params.username);
                                    res.render('user');
                                }
                        });
                    }
                }
            });
        }
    });
});
