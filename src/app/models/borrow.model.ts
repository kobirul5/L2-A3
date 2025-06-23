import { Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";


const borrowSchema = new Schema<IBorrow>({
    book: Schema.Types.ObjectId,
    quantity: { type: Number, required: true},
    dueDate: {
        type: Date,
        required: true,
    }
})