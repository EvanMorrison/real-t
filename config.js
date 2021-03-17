// this is a template for the config.js file. The real config.js file
// contains api keys and passwords and thus is not pushed to the Github repo. 

// process.env.PORT = 8700;

module.exports = {
    db_path: 'ds127044.mlab.com:27044',
    db_name: 'real-t',
    db_user: 'realTApp',
    db_pwd: 'fd}Ut20HuxrUO585',
    token_secret: 'nWxc2nOMevK=RL$+D+',
    googleAuth: {
      clientID: '70585612055-te6ehngq39covcshm2c5n6jeg33m85if.apps.googleusercontent.com',
      clientSecret: 'e0xvBwqJI1pOgvws25_Sk2PD',
      callbackURL: 'http://localhost:' + process.env.PORT + '/auth/google/callback'
    }
}

