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
                    console.log('referer: ', req.headers.referer);
                        console.log('now redirecting.');
                        if(authenticated)
                            res.redirect('/');
                    }
            });
        }
    });
});
