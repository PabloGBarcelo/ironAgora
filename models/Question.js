const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const questionSchema = new Schema({
  _idCourses: { type:Schema.Types.ObjectId, ref:'Course' },
  title: String,
  content: String,
  _authorId: { type:Schema.Types.ObjectId, ref:'User' },
  attachments: [String],
  tags: [ String ],
  isClosed: { type: Boolean, default: false },
  isSurvey: { type: Boolean, default: false },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
