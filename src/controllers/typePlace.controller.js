const TypePlace = require("../models/typePlace.model");
const Place = require('../models/place.model');
exports.createTypePlace = (req, res) => {
    const newTypePlace = new TypePlace({
      name: req.body.name
    })
    newTypePlace.save()
      .then((typePlace) => {       
        res.send(typePlace)
      })
      .catch(err => {
        res.status(404).send(err);
      })
  }
exports.getTypePlace = (req, res) => {
  TypePlace.find()
  .then((typePlace) => {
      res.send(typePlace)
    }
  )
  .catch(err => {
    res.status(400).send(err)
  })
}
exports.updateTypePlace = (req,res) =>{
  TypePlace.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
  .then((typePlace)=>{
        res.send({
          message: "Type Place updated",
          typePlace 
      })
    })
    .catch(err => {
      return res.send(err)
    })
  .catch(err => {
    res.status(400).send(err)
  })
}
exports.deleteTypePlace = (req,res) =>{
  TypePlace.findOneAndDelete({_id: req.params.id})
  .then((typePlace)=>{
  })
}
