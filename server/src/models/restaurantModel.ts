import mongoose from 'mongoose';

export interface IRestaurant{
    user:mongoose.Schema.Types.ObjectId;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    imageUrl: string;
    menus:mongoose.Schema.Types.ObjectId[];
}

const restaurantSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantName: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    deliveryTime: {
        type: Number,
        required: true,
        min: 0
    },
    cuisines: [
        {
            type: String,
            required: true,
            trim: true
        }
    ],
    menus: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            required: true
        }
    ],
    imageUrl: {
        type: String,
        required: true,
        trim: true
    }   
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;