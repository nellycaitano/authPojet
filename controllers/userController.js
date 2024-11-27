const User = require('../models/User')





exports.getUser =  async(req,res)=>{
    try {
        const user = await User.findById(req.param.id);
        if(!user) res.status(404).send({msg:'Utilisateur inexistant'})
        res.send(user);
    } catch (error) {
        res.status(500).send({error:'error lors de  la recupération sur  le serveur'})
        
    }
}
exports.getAllUsers= async (req,res)=>{
    try {
        const user = await User.find({});
        res.send(user);
    } catch (error) {
        console.log(err)
        res.status(500).send({error:'error lors de  la recupération sur  le serveur'})
        
    }
}



/**
 * Endpoint : Obtenir le profil utilisateur
 */
exports.getProfil = async (req, res) => {


  
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclure le mot de passe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

/**
 * Endpoint : Mettre à jour le profil utilisateur
 */
exports.updateProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    // Mise à jour des informations
    user.username = username ;
    user.email = email;
    await user.save();

    res.status(200).json({ message: 'Profil mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

/**
 * Endpoint : Supprimer le compte utilisateur
 */
exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.status(200).json({ message: 'Compte supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

