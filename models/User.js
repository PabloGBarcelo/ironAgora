const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    twitter: String,
    linkedin: String,
    github: String,
    blog: String,
    avatar_thumb: String,
    avatar_mini: String,
    is_admin: { type: Boolean, required: true },
    _courses: [{type: Schema.Types.ObjectId, ref:'Course'}]
  },
  {
    timestamp: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
