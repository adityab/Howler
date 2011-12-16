app.get('/logout', function (req, res, params) {
    req.logout();
    if(req.headers.referer) {
        res.redirect(req.headers.referer);
    }
    else {
        res.redirect('/');
    }
});

// auth routes
app.get('/auth/facebook', function(req, res) {
    req.authenticate(['facebook'], function(err, authenticated) {
        if(err) console.log(err.message);
        else {
            loadAccount(req, function(err, account) {
                if(err) console.log(err.message);
                else {
                    console.log(req.headers.referer);
                    if(req.headers.referer.substring(0,23) == 'http://www.facebook.com'){
                        res.redirect('/');
                    }
                }
            });
        }
    });
});
