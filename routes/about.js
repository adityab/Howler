app.get('/about/this', function(req, res) {
    loadAccount(req, function(err, account) {
        if(err) console.log(err);
        else {
            res.local('account', account);
            res.local('title', 'About Howler');
            res.render('about');
        }
    });
});
