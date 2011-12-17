app.get('/', function(req, res) {
    loadAccount(req, function(err, account) {
        if(err) {
            console.log(err.message);
        }
        else {
        var howls_per_page = 100;
        turbulence.queryPost( 
            {}, 
            { sort: [['date', 'descending']], limit: howls_per_page },
            function(err, howls) {
                if(err) {
                    console.log(err.message);
                }
                else {
                    console.log(howls);
                    res.local('howls', howls);
                    res.local('account', account);
                    res.local('title', 'Howler');
    
                    try {
                        res.render('home');
                    }
                    catch (err) {
                        console.log(err.message);
                    }

                } // end else
        });

        } // end else
    });
});

