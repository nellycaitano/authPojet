const express = require("express");
const router = express.Router();
const {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");


const {isAuthenticated, isOwner } = require('../middlewares/middleware');
const { authenticateToken } = require("../controllers/authcontroller");

// GET: Toutes les annonces (avec recherche par critères)
router.get("/list", authenticateToken,getListings);

// GET: Détails d'une annonce spécifique
router.get("/:id", getListingById);

// POST: Ajouter une annonce (réservé aux propriétaires authentifiés)
router.post("/", authenticateToken, createListing);

// PUT: Mettre à jour une annonce (réservé au propriétaire de l'annonce)
router.put("/:id", authenticateToken,isOwner, updateListing);

// DELETE: Supprimer une annonce
router.delete("/:id", authenticateToken, isOwner, deleteListing);

module.exports = router;
