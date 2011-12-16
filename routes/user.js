app.get('/:username', function(req, res) {
    loadAccount(req, function(err, account) {
        if(err) console.log(err);
        else {
            turbulence.queryAgent('agent_person', {username: req.params.username}, function(err, user) {
                if(err) console.log(err);
                else {
                    var search_regex = new RegExp('@' + req.params.username, 'i');
                    var howls_per_page = 25;
                    turbulence.queryPost(   
                        {$or: [{username: req.params.username}, {text: search_regex}] },
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
            });
        }
    });
});
