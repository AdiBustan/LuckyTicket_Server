import mongoose from "mongoose";

export interface IEventPost {
    title: string;
    message: string;
    owner: string;
}

const eventPostSchema = new mongoose.Schema<IEventPost>({
    title: {
        type: String,
        required: true,

    },
    message: {
        type: String,
        required: true,

    },
    owner: {
        type: String,
        required: true,

    },
})

export default mongoose.model<IEventPost>("EventPosts", eventPostSchema);
