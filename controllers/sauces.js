const Sauce = require('../models/sauce');
const fs = require('fs');
const { json } = require("body-parser"); 

exports.createSauce = (req, res, next) => { 
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
            }`,
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'successfull' }))
        .catch((error) => res.status(400).json({ error}));
        
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then((sauce) => {
        res.status(200).json(sauce);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
            }`,
    }
        : { ...req.body };

    Sauce.updateOne({ _id: req.params.id },
        { sauceObject, _id: req.params.id }
    )
        .then(() => {
            res.status(201).json({
                message: 'Sauce update success'
            });
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Delete' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};


exports.getAllSauce = (req, res, next) => {
    Sauce.find().then((sauces) => {
        res.status(200).json(sauces);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};


exports.likeSauce = (req, res, next) => {
    console.log({ _id: req.params.id });
    console.log({ likes: req.body.like });
    console.log({ usersLiked: req.body.userId });
  
    const sauceObject = req.body;
    console.log(sauceObject);
  
    if (sauceObject.like === 1) {
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: +1 },
          $push: { usersLiked: req.body.userId },
        }
      )
        .then(() => res.status(200).json({ message: "un like en plus !" }))
        .catch((error) => res.status(400).json({ error }));
    } else if (sauceObject.like === -1) {
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: +1 },
          $push: { usersDisliked: req.body.userId },
        }
      )
        .then(() => res.status(200).json({ message: "un dislike en plus !" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          console.log(sauce);
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersLiked: req.body.userId },
                $inc: { likes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: "enleve le like !" }))
              .catch((error) => res.status(400).json({ error }));
          } else if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then(() =>
                res.status(200).json({ message: "enleve le dislike !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(400).json({ error }));
    }
  };