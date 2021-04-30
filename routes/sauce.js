// les routes qui seront exporté dans notre page js qui regrouge les controllers et les middleware
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauces');

router.post('', auth, multer, sauceCtrl.createSauce); // création des objets
router.get('/:id', auth, sauceCtrl.getOneSauce); // permet d'afficher un objet selectionné
router.put('/:id', auth, sauceCtrl.modifySauce); // permet de modifié un objet selectionné
router.delete('/:id', auth, sauceCtrl.deleteSauce); // permet de supprimer un objet
router.get('', auth, sauceCtrl.getAllSauce); // permet d'afficher dans le front les objets créés
router.post('/:id/like', auth, sauceCtrl.likeSauce); //permet d'update à travers les "likes" et "dislikes"


module.exports = router;

