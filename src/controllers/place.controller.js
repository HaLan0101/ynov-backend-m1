const Place = require('../models/place.model');
const Typeplace = require('../models/typePlace.model');
const User = require("../models/user.model.js");
exports.createPlace = (req, res) => {
  // const newPlace = new Place({
  //   name: req.body.name
  // })
  Place.create(req.body)
    .then(
      async (place) => {
        console.log("new", place._id);
        try {
          const user = await User.findById(req.userToken.id);
          console.log(req.userToken);
          user.places.push(place._id);
          user.save();
          res.send(place);
        }
        catch (err) {
          console.log(err)
        }
      }
    )
    .catch(err => res.status(400).send(err));
}
exports.getPlaces = (req, res) => {
    Place.find().populate('owner')
    .then((places) => {
        res.send(places)
      }
    )
    .catch(err => {
      res.status(400).send(err)
    })
}
exports.getMyPlaces = (req, res) =>{
    User.findById(req.userToken.id).populate('places')
    .then( (user) =>{
      res.send(user.places);
    })
    .catch(err => {
      res.status(400).send(err)
    })
    // Place.find({owner: req.userToken.id})
    //       .then((places) => {
    //           res.send(places)
    //         }
    //       )
    //       .catch(err => {
    //         res.status(400).send(err)
    //       })
}
exports.getMyPlace = (req,res) =>{
  User.findById(req.userToken.id).populate('places')
    .then( (user) =>{
      user.places.forEach(place => {
        if(place._id.toString() === req.params.id) {
            console.log(typeof place);
            res.send(place)
        }
    });
    })
    .catch(err => {
      res.status(400).send(err)
    })
}
exports.updateMyPlace = (req,res) =>{
  Place.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
  .then((place)=>{
    User.findById(req.userToken.id)
    .then((user)=>{
      User.findOneAndUpdate({_id:req.userToken.id},{places:user.places})
      .then((user)=>{
        res.send({
          message: "place updated",
          place,
          user
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

exports.deleteMyPlace = (req,res) =>{
  Place.findOneAndDelete({_id: req.params.id, owner:req.userToken.id})
  .then((place)=>{
    User.findById(req.userToken.id)
    .then((user)=>{
      const index = user.places.indexOf(req.params.id);
      user.places.splice(index,1);
      User.findOneAndUpdate({_id:req.userToken.id},{places:user.places})
      .then((user)=>{
        res.send({
          message: "place deleted",
          place,
          user
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
exports.searchPlaces = (req,res) =>{
  Place.find({
    $or: [
      { 'title': { '$regex': req.params.search, '$options': 'i' } },
      { 'description': { '$regex': req.params.search, '$options': 'i' } }
    ]
  })
  .then(places => res.json(places))
  .catch(err => {
      res.status(400).send(err)
    })
}
exports.filterPlaces = async (req,res) => {
  const filter = {}
  if(req.query.capacity){
    const str = req.query.capacity.split('-')
    filter.capacity = {
      '$gte': parseInt(str[0]), '$lte': parseInt(str[1])
    }
  }
  if(req.query.price){
    const str1 = req.query.price.split('-') 
    filter.price = {
        '$gte': parseInt(str1[0]), '$lte': parseInt(str1[1])
    }
  } 
  if(req.query.types){
    filter.types = req.query.types
  }
  console.log(filter)
  Place.find(filter)

  .then(places => res.json(places))
  .catch(err => {
    res.status(400).send(err)
  })
}