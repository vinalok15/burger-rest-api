import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { User } from '../models/User.js';
export const connectionPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLINT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECERET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        //Database comes here
        //console.log(profile);
        const user = await User.findOne({
          googleId: profile.id,
        });

        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            photo: JSON.stringify(profile.photos[0]),
          });
        } else {
          return done(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
};

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
