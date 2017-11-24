const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const nodemailer = require('nodemailer');
const Question = require('../models/Question');
router.post('/:id/newAnswer', (req, res, next) => {

  let newAnswer = new Answer ({
      _idQuestion: req.params.id,
      content: req.body.answer,
      attachments: "",
      _authorId: req.user.id
  });
  'use strict';
// Send email to author about Id
Question.findById(req.params.id)
        .populate('_authorId')
        .then((questionData) => {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
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
                  from: '"IronAgora 👻" <ironagora.yeah@gmail.com>', // sender address
                  to: questionData._authorId.email, // list of receivers
                  subject: 'You have a new answer in ironAgora ✔!', // Subject line
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
            newAnswer.save((err) =>{
              res.redirect(`/forum/${req.params.id}/show`);
            });
        }); // End findByID

}); // End Tag

router.post('/:id/removeAnswer', (req, res, next) => {
  let removeComment ={
    content: "- message deleted by user -"
  };
  Answer.findByIdAndUpdate(req.params.id,removeComment)
        .then(() => res.redirect(`/forum/${req.query.fromStory}/show`))
        .catch((err) => console.log(err));
});
module.exports = router;
