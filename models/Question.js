const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const questionSchema = new Schema({
  title: String,
  content: String,
  _authorId: { type:Schema.Types.ObjectId, ref:'User' },
  attachments: [String],
  tags: [ String ],
  mainPhoto: String,
  forum: { type: String, enum:['UX','Web'], default: 'UX' },
  isClosed: { type: Boolean, default: false },
  isSurvey: { type: Boolean, default: false },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
