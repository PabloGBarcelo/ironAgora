require('dotenv').config();
const passport = require("passport");
const User = require('../models/User');
const SlackStrategy = require('passport-slack').Strategy;

passport.use(new SlackStrategy({
    clientID: process.env.slackClientId,
    clientSecret: process.env.slackClientSecret,
    callbackURL: process.env.slackCallbackURL,
    scope:  ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team']
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({ slackId: profile.id })
      .then(user => {
        if (user) {
          return cb(null, user);
        } else {
          const newUser = new User({
            name: profile.displayName,
            email: profile.user.email,
            slackId: profile.id,
            avatar: profile.user.image_192,
            forum: 'UX'
          });
          if (typeof(questionData._authorId.email) != "undefined"){
            console.log('Hello!');
          nodemailer.createTestAccount((err, account) => {

              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 465,
                  secure: true, // true for 465, false for other ports
                  auth: {
                      user: "ironagora.yeah@gmail.com", // generated ethereal user
                      pass: "vivaIronhack"  // generated ethereal password
                  }
              });

              // setup email data with unicode symbols
              let mailOptions = {
                  from: 'Welcome to IronAgora 👻" <ironagora.yeah@gmail.com>', // sender address
                  to: profile.user.email, // list of receivers
                  subject: 'Thanks to come to our community ✔!', // Subject line
                  text: 'Congratulations! you have a new email!!', // plain text body
                  html: '<b>Congrats! You have a new person talking about your post!!!</b>' // html body
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
                  console.log('Message sent: %s', info.messageId);
                  // Preview only available when sending through an Ethereal account
                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
              });
          });
          }
          newUser.save((err) => {
            if (err) { return cb(err); }
            cb(null, newUser);
          });
        }
      })
      .catch(error =>{
        return cb(err);
      });
  }
));
