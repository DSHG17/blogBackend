import { Schema, model } from "mongoose";

const commentarySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  publicationId: {
    type: Schema.Types.ObjectId,
    ref: "Publication",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false,
  timestamps: false
});

export default model("Commentary", commentarySchema);
