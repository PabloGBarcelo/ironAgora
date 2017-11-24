const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const clapSchema = new Schema({
    _idQuestion: { type:Schema.Types.ObjectId, ref:'Question' },
    _authorId: { type:Schema.Types.ObjectId, ref:'User' }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

clapSchema.methods.saveAndFind = function(cb) {
  this.save(function(error, results) {
    if (error) { throw error; }
    return this.model('Clap').find({}, cb);
  }.bind(this));
};

const Clap = mongoose.model('Clap', clapSchema);
module.exports = Clap;
