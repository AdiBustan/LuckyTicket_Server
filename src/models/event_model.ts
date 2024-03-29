import mongoose from "mongoose";

export interface IEvent {
    date: string;
    hour: string;
    location: string;
    city: string;
    artist: string;
    phone: string;
    comments: Array<string>;
    _id?: string;
    ownerId: string;
    imgName: string;
}

const eventSchema = new mongoose.Schema<IEvent>({
    date: {
        type: String,
        required: true,

    },
    hour: {
        type: String,
        required: true,

    },
    location: {
        type: String,
        required: true,

    },
    city: {
        type: String,
        required: true,

    },
    artist: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,
    },
    comments: {
        type: [String],
        required: true,

    },
    ownerId: {
        type: String,
        required: true,
    },
    imgName: {
        type: String,
        required: true,
    }
})

export default mongoose.model<IEvent>("Events", eventSchema);
