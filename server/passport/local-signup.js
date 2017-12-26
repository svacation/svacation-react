const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    name: req.body.name.trim(),
    phone: req.body.phone.trim(),
    email: email.trim(),
    password: password.trim(),
    wechat: req.body.wechat.trim(),
    birthday: req.body.birthday.trim(),
    address: '',
    role: '1'
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});
