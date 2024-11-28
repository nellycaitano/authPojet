const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

  availability: {
    type: [
      {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    ],
    required: false, // Le tableau doit être fourni
  },
  
  photos: {
    type: [{
      type: String // URL des photos stockées
    }],
    required: false, // Les photos doivent être fournies
    default: [] // Par défaut, aucune photo n'est fournie
  },
 
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('listingModel', propertySchema);
