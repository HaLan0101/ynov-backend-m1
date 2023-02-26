const Place = require('../models/place.model.js');
const User = require("../models/user.model.js");
const Booking = require("../models/booking.model.js");

// exports.createReservation = (req, res) => {
//     Booking.create(req.body)
//       .then(
//         async (place) => {
//           try {
//             var query = {"owner": req.userToken.id }
//             const user = await User.findById(req.userToken.id);
//             user.places.push(place._id);
//             user.save();
//             await Place.findByIdAndUpdate(place._id, query);
//             res.send(place);
//           }
//           catch (err) {
//             console.log(err)
//           }
//         }
//       )
//       .catch(err => res.status(400).send(err));
//   }