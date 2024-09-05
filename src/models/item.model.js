import mongoose, {Schema} from "mongoose";
import mongooseAggregate from 'mongoose-aggregate-paginate-v2';


const  itemSchema = new Schema ({
    itemname: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    itempic: {
        type: String
    },
    itemOld: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
    },
    isAvail: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
     refreshToken: {
        typre: String
    }
},
{
    timestamps: true
}
)

itemSchema.plugin(mongooseAggregate)

export const User = mongoose.model("User", userSchema);