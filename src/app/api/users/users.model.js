import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        maxlength: [50, 'Username cannot exceed 50 characters']
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        maxlength: [255, 'Email cannot exceed 255 characters']
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [255, 'Password cannot exceed 255 characters']
      },
      bio: {
        type: String
      },
      profilePicture: {
        type: String,
        maxlength: [255, 'Profile picture URL cannot exceed 255 characters']
      },
      interactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interaction'
      }]
    }, { timestamps: true });

  export default mongoose.models.User ||mongoose.model('User', UserSchema);