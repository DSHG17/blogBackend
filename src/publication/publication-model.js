import {Schema, model} from "mongoose";

const publicationSchema = Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        maxLength:[50, "Title cannot exceed 50 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength:[300, "Description cannot exceed 300 characters"]
    },
    author:{
        type: String,
        default:"Derian Hernández"
    },
    class:{
        type: String,
        required: true,
        enum:["TICS","TALLER","TECNO"]
    },
    date:{
        type: Date,
        default: Date.now
    },
    publicationPicture:{
        type: String,
    },
    status:{
        type: Boolean,
        default: false
    }
},
{
    versionKey: false,
    timestamps: true
})


export default model("Publication", publicationSchema)