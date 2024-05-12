import mongoose from "mongoose";

const InteractionSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post ID is required']
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
    },
  }, { timestamps: true });

  export default mongoose.models.Interaction || mongoose.model('interaction', InteractionSchema);