const Listing = require("../models/listingModel");

// Obtenir toutes les annonces avec des filtres
const getListings = async (req, res) => {
  try {
    const { location, price, availability } = req.body;
    let filters = {};

    if (location) filters.location = location;
    if (price) filters.price = { $lte: price }; // Prix inférieur ou égal
    if (availability) filters.availability = availability;

    const listings = await Listing.find(filters);
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Obtenir une annonce spécifique
const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Annonce introuvable" });
    }

    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Créer une annonce
const createListing = async (req, res) => {
  try {
    const { title, location, description, price, availability } = req.body;

    if (![title, location, description, price, availability].every(Boolean))
      return res.status(400).json({ error: "Tous les champs sont requis." });

    const newListing = await Listing.create({
      title,
      description,
      location,
      price,
      availability,
      owner: req.user.userId, // Utilisateur authentifié
    });

    res
      .status(201)
      .json({ message: "Annonce créée avec succès", listing: newListing });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Mettre à jour une annonce
const updateListing = async (req, res) => {

  try {

    const { id } = req.params;
    const updates = req.body;
    console.log(req.user)
    const updatedListing = await Listing.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedListing) {
      return res.status(404).json({ message: "Annonce introuvable" });
    }

    res
      .status(200)
      .json({
        message: "Annonce mise à jour avec succès",
        listing: updatedListing,
      });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Supprimer une annonce
const deleteListing = async (req, res) => {

  try {
    const { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ message: "Annonce introuvable" });
    }

    res.status(200).json({ message: "Annonce supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};
