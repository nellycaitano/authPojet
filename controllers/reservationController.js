const Reservation = require("../models/reservationModel");

// Créer une réservation
const createReservation = async (req, res) => {
  try {
    const { listingId, startDate, endDate } = req.body;

    const newReservation = await Reservation.create({
      listing: listingId,
      user: req.user.id,
      startDate,
      endDate,
    });

    res.status(201).json({ message: "Réservation créée avec succès", reservation: newReservation });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Obtenir les réservations d'un utilisateur
const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate("listing");

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Annuler une réservation
const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.status(200).json({ message: "Réservation annulée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = { createReservation, getUserReservations, cancelReservation };
