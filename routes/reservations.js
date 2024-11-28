const express = require("express");
const router = express.Router();
const {
  createReservation,
  getUserReservations,
  getListingReservations,
  cancelReservation,
} = require("../controllers/reservationController");
const { isAuthenticated, isOwner } = require('../middlewares/middleware');
const { authenticateToken } = require("../controllers/authcontroller");

// POST: Réserver une annonce
router.post("/create", authenticateToken, createReservation);

// GET: Les réservations d'un utilisateur
router.get("/user", authenticateToken, getUserReservations);
/*
// GET: Les réservations pour une annonce (réservé au propriétaire)
router.get("/listing/:listingId", authenticateToken, isOwner, getListingReservations);

// DELETE: Annuler une réservation
router.delete("/:id", authenticateToken, cancelReservation);*/

module.exports = router;
