import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: [10, "Too short Title"],
      maxlength: [30, "Too long Title"],
    },
    body: {
      type: String,
      trim: true,
      minlength: [10, "Too short body"],
      maxlength: [2000, "Too long body"],
    },

    User_Id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Blog must be belong to parent user"],
    },
    isAccepted:{
        type:Boolean,
        default:false
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel
