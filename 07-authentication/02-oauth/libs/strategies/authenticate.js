
const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  if (!email) return done(null, false, 'Не указан email');

  await User.findOne({email: email}, async (err, user) => {
    if (err) return done(err);
    if (user) {
      done(null, user);
    } else {
      try {
        const userNew = await User.create({email: email, displayName: displayName});
        done(null, userNew);
      } catch (err) {
        if (err.name !== 'ValidationError') throw err;
        done(err, false, err.errors.email.message);
      }
    }
  });
};
