const Place = require('../models/place.model.js');
const User = require("../models/user.model.js");
const Booking = require("../models/booking.model.js");

exports.createReservation = (req, res) => {
    Booking.create(req.body)
      .then(
        async (booking) => {
          try {
            var client = {"client": req.userToken.id};
            var owner = booking.owner;
            if(owner == req.userToken.id){
              Booking.findOneAndDelete(booking._id)
              .then(booking => res.send({ message: "You can't not make a reservation on your place"}))
            }
            else{
              const user = await User.findById(req.userToken.id);
              user.bookings.push(booking._id);
              user.save();
              const user1 = await User.findById(owner);
              user1.bookingsOwner.push(booking._id);
              user1.save();
              await Booking.findByIdAndUpdate(booking._id, client);
              res.send(booking);
            }
          }
          catch (err) {
            console.log(err)
          }
        }
      )
      .catch(err => res.status(400).send(err));
}
exports.getBookings = (req, res) => {
  Booking.find().populate('owner').populate('client').populate('place')
  .then((bookings) => {
      res.send(bookings)
    }
  )
  .catch(err => {
    res.status(400).send(err)
  })
}
exports.getMyBookings = (req, res) =>{
  User.findById(req.userToken.id).populate('bookings')
  .then( (user) =>{
    res.send(user.bookings);
  })
  .catch(err => {
    res.status(400).send(err)
  })
}
exports.getMyBookingsOwner = (req, res) =>{
  User.findById(req.userToken.id).populate('bookingsOwner')
  .then( (user) =>{
    res.send(user.bookingsOwner);
  })
  .catch(err => {
    res.status(400).send(err)
  })
  
}

exports.updateBooking = (req,res) =>{
  Booking.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
  .then((booking)=>{
    User.findById(booking.owner)
    .then((owner)=>{
      User.findOneAndUpdate({_id:booking.owner},{bookingsOwner:owner.bookingsOwner})
      .then((user)=>{
        res.send({
          message: "booking updated",
          booking,
          owner
        });
      })
    })
    .catch(err => {
      return res.send(err)
    })
  })
  .catch(err => {
    res.status(400).send(err)
  })
}