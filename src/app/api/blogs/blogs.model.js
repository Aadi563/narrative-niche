import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  coverImage:{
    type: String,
    required: [true, 'Cover Image is required']
  },
  coverContent:{
    type: String,
    required: [true, 'Cover Image is required'],
    maxlength: [255, "Max length can't be more than 255 characters"]
  },
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  // category: {
  //   type: String,
  //   required: [true, 'Category is required'],
  //   maxlength: [100, 'Category cannot exceed 100 characters']
  // },
  // tags: {
  //   type: String,
  //   required: [true, 'Tags are required'],
  //   maxlength: [255, 'Tags cannot exceed 255 characters']
  // },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  // interactions: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Interaction'
  // }]
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);