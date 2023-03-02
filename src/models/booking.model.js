const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
    },
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    quantity : {
        type : Number,
        required: true
    },
    status : {
        type: String,
        enum : ['WAITING','ACCEPTED','CANCELLED'],
        default: "WAITING",
        required: true
    }
})
module.exports=mongoose.model('Booking',bookingSchema)