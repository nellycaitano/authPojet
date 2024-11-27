const express = require("express");
const router = express.Router();
const {
  createReservation,
  getUserReservations,
  getListingReservations,
  cancelReservation,
} = require("../controllers/reservationController");
const { isAuthenticated, isOwner } = require('../middlewares/middleware')
/*
// POST: Réserver une annonce
router.post("/", isAuthenticated, createReservation);

// GET: Les réservations d'un utilisateur
router.get("/user", isAuthenticated, getUserReservations);

// GET: Les réservations pour une annonce (réservé au propriétaire)
router.get("/listing/:listingId", isAuthenticated, isOwner, getListingReservations);

// DELETE: Annuler une réservation
router.delete("/:id", isAuthenticated, cancelReservation);
*/
module.exports = router;
