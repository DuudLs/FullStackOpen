const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.statics.findByIdAndRemove = async function (id) {
  return await this.findOneAndDelete({ _id: id });
};

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

blogSchema.statics.updateLikes = async function (id) {
  const blog = await this.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  return blog;
};

module.exports = mongoose.model("Blog", blogSchema);
