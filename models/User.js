const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: type: String,
    surname: type: String,
    avatar: String,
    is_admin: { type: Boolean, required: true, default: false },
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
