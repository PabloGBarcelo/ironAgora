const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const answerSchema = new Schema({
  _idQuestion: Schema.Types.ObjectId,
  content: String,
  attachments: [String],
  _authorId: { type:Schema.Types.ObjectId, ref:'User' }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
