const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/second-project', {useMongoClient: true});
const User = require('../models/User');

const users = [
  {
    username: 'carlosob',
    name: 'Carlos Sobera',
    email: 'carlos.sobera@mail.com',
    slackId: 'UIP2678K',
  },
  {
    username: 'nosoyhacker',
    name: 'Chema alonso',
    email: 'chema.hack@mail.com',
    githubId: '83620953',
  },
  {
    username: 'vicma',
    name: 'Victor Matute',
    email: 'victormatu@sending.com',
    slackId: 'UPW2L28L',
  },
  {
    username: 'nosoyhacker',
    name: 'Chema alonso',
    email: 'chema.hack@mail.com',
    githubId: '83783453',
    forum: 'Web',
  },
  {
    username: 'nosoyhacker',
    name: 'Chema alonso',
    email: 'chema.hack@mail.com',
    githubId: '97241673',
    forum: 'Web'
  }
];

User.create(users)
  .then(docs => {
    docs.forEach(user => {
      console.log(user._id);
    });
    mongoose.connection.close();
  })
  .catch(error => {
    throw error;
  });
