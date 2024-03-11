import mongoose from "mongoose";

export interface IEvent {
    date: string;
    hour: string;
    location: string;
    city: string;
    artist: string;
    image: string;
    phone: string;
    comments: Array<string>;
    _id?: string;
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
    image: {
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

    }
})

export default mongoose.model<IEvent>("Events", eventSchema);
