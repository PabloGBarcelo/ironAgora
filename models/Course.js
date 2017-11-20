const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: { type: String, required: true },
    city: { type: String, required: true },
    edition: { type: Number, required: true },
    course: { type: Number, required: true },
    type: { type: String, required: true },
  },
  {
    timestamp: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
