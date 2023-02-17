const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place"
    },
    dateStart: Date,
    dateEnd: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    } 
})
module.exports=mongoose.model('Booking',bookingSchema)