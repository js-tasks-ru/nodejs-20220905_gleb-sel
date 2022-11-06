const User = require('../../models/User');

const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    function(email, password, done) {
      User.findOne({email: email}, (err, user) => {
        if (err) {
          return done(err);
        };
        if (!user) {
          return done(null, false, 'Нет такого пользователя');
        };
        // console.log(password);
        user.checkPassword(password).then((res) => {
          return res ? done(null, user) : done(null, false, 'Неверный пароль');
        });
      });
      // done(null, false, 'Стратегия подключена, но еще не настроена');
    },
);
