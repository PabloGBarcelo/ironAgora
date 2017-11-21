const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    name: String,
    email: String,
    slackId: String,
    githubId: String,
    avatar: String,
    is_admin: { type: Boolean, required: true, default: false },
    forum: { type: String, enum:['UX','Web'], default: 'UX' }
  },
  {
    timestamp: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
