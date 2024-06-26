const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true, // les espaces
        lowercase: true,
        minLength: 2,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    type:{
        type: String,
        enum : ['OWNER','CUSTOMER'],
        default: "CUSTOMER"
    },
    places: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place"
        }
    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ],
    bookingsOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ]
})
module.exports=mongoose.model('User',userSchema)