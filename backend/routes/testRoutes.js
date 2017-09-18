
const User = require('../models/user.model');

module.exports = function(app) {

  app.post('/test/signup', (req, res) => {
    let user = {};
    console.log('reqbody ', req.body);
    user = new User(req.body);
    res.json(user);
  })
}