const request = require("supertest");
const app = require("../server"); // Chemin vers votre fichier principal
const User = require("../models/User");
const mongoose  = require('mongoose')
const BlacklistedToken = require("../models/BlackListedToken");
const Listing = require("../models/listingModel");

const { verifyToken } = require("../config/jwt");
require("dotenv").config();

let mytoken;
/*
describe("CRUD USER", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    await BlacklistedToken.deleteMany({});

    await request(app)
      .post("/api/auth/register") // Le point d'inscription de l'API
      .send({
        username: "John Doe",
        email: "johnrdg47ortr@example.com",
        password: "password123",
      });
    // On envoie les informations de login pour récupérer un token
    const loginResponse = await request(app)
      .post("/api/auth/login") // Le point de login de l'API
      .send({
        email: "johnrdg47ortr@example.com",
        password: "password123",
      });

    mytoken = loginResponse.body.token;
    // Supposons que le token est dans la réponse
  });
  //RECUPERER CONNECT USER
  it("devrait récupérer le profil de l'utilisateur", async () => {
    const response = await request(app)
      .get("/api/users/me")
      .set("authorization", `Bearer ${mytoken}`); // En-tête d'authentification
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  // Test de la récupération de tous les utilisateurs
  it("devrait récupérer tous les utilisateurs", async () => {
    // Récupération des utilisateurs
    const response = await request(app)
      .get("/api/users/all")
      .set("authorization", `Bearer ${mytoken}`); // Utiliser le token de connexion

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(response.body.length);
  });

  // Test pour la mise à jour du profil utilisateur
  it("devrait mettre à jour le profil de l'utilisateur", async () => {
    const response = await request(app)
      .put("/api/users/update")
      .set("Authorization", `Bearer ${mytoken}`)
      .send({
        username: "John Updated",
        email: "johnupdated@example.com",
      });

    expect(response.status).toBe(200);
  });

  // Test pour la suppression du compte utilisateur

  it("devrait supprimer le compte utilisateur", async () => {
    const response = await request(app)
      .delete("/api/users/delete")
      .set("authorization", `Bearer ${mytoken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Compte supprimé avec succès"
    );
  });
});

// Chemin vers votre fichier principal

describe("API Auth Tests", () => {
  // Nettoyage des collections avant chaque test
  beforeAll(async () => {
    await User.deleteMany({});
    await BlacklistedToken.deleteMany({});

    await request(app)
      .post("/api/auth/register") // Le point d'inscription de l'API
      .send({
        username: "John Doe",
        email: "johnrdgortr@example.com",
        password: "password123",
      });
    // On envoie les informations de login pour récupérer un token
    const loginResponse = await request(app)
      .post("/api/auth/login") // Le point de login de l'API
      .send({
        email: "johnrdgortr@example.com",
        password: "password123",
      });

    mytoken = loginResponse.body.token; // Supposons que le token est dans la réponse
  });

  // Test de l'inscription
  it("devrait inscrire un utilisateur", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "John Doe",
      email: "gortr@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("msg", "Utilisateur créé avec succès");
  });

  // Test de la connexion
  it("devrait connecter un utilisateur et retourner un token", async () => {
    // Créer un utilisateur
    await request(app).post("/api/auth/register").send({
      username: "Jane Doe",
      email: "janeee.doe@example.com",
      password: "password123",
    });

    // Connexion
    const response = await request(app).post("/api/auth/login").send({
      email: "janeee.doe@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    token = response.body.token; // Sauvegarder le token pour les tests suivants
  });

  //Test de la déconnexion
  it("devrait déconnecter un utilisateur et invalider le token", async () => {
    await request(app).post("/api/auth/register").send({
      username: "JaneDoe",
      email: "janette.doe@example.com",
      password: "password123",
    });

    // Connexion
    const firstresponse = await request(app).post("/api/auth/login").send({
      email: "janeee.doe@example.com",
      password: "password123",
    });
    const token = firstresponse.body.token;
    // Déconnexion
    const response = await request(app)
      .post("/api/auth/logout")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Déconnexion réussie. Token invalidé."
    );
    // Vérifier que le token est ajouté à la liste noire
    const blacklisted = await BlacklistedToken.findOne({ token });
    expect(blacklisted).not.toBeNull();
  });
});

describe("test send email", () => {
  it("devrait confirmer l'envoi de mail", async () => {
    const response = await request(app)
      .post("/api/email/send")
      .set("authorization", `Bearer ${mytoken}`)
      .send({
        email: "johnrdgortr@example.com",
      });

    expect(response.status).toBe(200)
  });
});
describe("PASSWORD ", () => {
  it("devrait permettre de réinitialiser le mot de passe avec un token valide", async () => {
    const email = verifyToken(mytoken, process.env.JWT_SECRET).email;
    const response = await request(app).post("/api/forgot-password").send({
      token: mytoken,
      email: email,
    });

    //expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty('msg', 'Mot de passe réinitialisé avec succès');
  });

  it("changer le mot de passe", async () => {
    const response = await request(app)
      .post("/api/reset")
      .set("authorization", `Bearer ${mytoken}`)
      .send({
        newPass: "mytokenmm",
      });

    expect(response.status).toBe(200);
    //expect(response.body).toHaveProperty('message', 'Mot de passe réinitialisé avec succès');
  });
});

describe("API des annonces", () => {
  beforeEach(async () => {
    await Listing.deleteMany({});
    await request(app)
      .post("/api/auth/register") // Le point d'inscription de l'API
      .send({
        username: "John Doe",
        email: "johnrdgor45tr@example.com",
        role:"owner",
        password: "password123",
      });
    // On envoie les informations de login pour récupérer un token
    const loginResponse = await request(app)
      .post("/api/auth/login") // Le point de login de l'API
      .send({
        email: "johnrdgor45tr@example.com",
        password: "password123",
      });

    mytoken = loginResponse.body.token;
  });

  it("POST /annonces - Créer une annonce avec succès", async () => {
    const newAnnonce = {
      title: "Villa luxueuse",
      location: "Agori",
      description: "Une villa avec piscine et vue sur la mer.",
      price: "300",
      availability: [],
    };

    const response = await request(app)
      .post("/listings/")
      .set("authorization", `Bearer ${mytoken}`)
      .send(newAnnonce);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.listing.title).toBe(newAnnonce.title);

    const annonceInDb = await Listing.findOne({ title: "Villa luxueuse" });
    expect(annonceInDb).not.toBeNull();
  });

  it("POST /annonces - Échec si des champs obligatoires manquent", async () => {
    const incompleteAnnonce = { title: "appartement " };

    const response = await request(app)
      .post("/listings/")
      .set("authorization", `Bearer ${mytoken}`)
      .send(incompleteAnnonce);

    expect(response.status).toBe(400);
  });

  it("GET /annonces - Récupérer toutes les annonces", async () => {
    const response = await request(app)
      .get("/listings/list")
      .set("authorization", `Bearer ${mytoken}`);

    expect(response.status).toBe(200);
  });

  it("PUT /annonces/:id - Mettre à jour une annonce", async () => {
    const stringId = verifyToken(mytoken, process.env.JWT_SECRET).userId;
 
    const newAnnonce = await Listing.create({
      title: "Nouvelle annonce",
      description: "dfd",
      location: "dfd",
      price: 250,
      availability: [],
      owner: stringId, // Utilisateur authentifié
    });
    
    const updates = { "title": "Nouvelle annonce", "price": "250" };

    const response = await request(app)
      .put(`/listings/${newAnnonce._id}`)
      .set("authorization", `Bearer ${mytoken}`)
      .send(updates);
   
    //expect(response.body.listing.title).toBe("Nouvelle annonce");
    //expect(response.body.listing.price).toBe(250);
  });

  it("DELETE /annonces/:id - Supprimer une annonce", async () => {
    const stringId = verifyToken(mytoken, process.env.JWT_SECRET).userId;
     const newAnnonce = await Listing.create({
      title: "Nouvelle annonce",
      description: "dfd",
      location: "dfd",
      price: 250,
      availability: [],
      owner: stringId, 
    });
    const response = await request(app)
      .delete(`/listings/${newAnnonce._id}`)
      .set("authorization", `Bearer ${mytoken}`);
   
    //expect(response.status).toBe(200);
    //expect(response.body.message).toBe("Annonce supprimée avec succès");

    const deletedAnnonce = await Listing.findById(newAnnonce._id);
    //expect(deletedAnnonce).toBeNull();
  });

  it("DELETE /listings/:id - Échec si l'id n'existe pas", async () => {
    const invalidId = "645f1c2e123456789abcdef0";

    const response = await request(app)
      .delete(`/listings/${invalidId}`)
      .set("authorization", `Bearer ${mytoken}`);
     
    //expect(response.status).toBe(404)

    //expect(response.body.message).toBe("Annonce non trouvée");
  });
});

*/

/*const request = require('supertest');
const app = require('../app'); // Le fichier où vos routes sont définies
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation'); // Modèle de réservation

describe('POST /api/reservations', () => {
  let userToken;

  beforeAll(async () => {
    // Créez un utilisateur pour simuler l'authentification
    const user = await User.create({
      username: 'testUser',
      password: 'testPassword',
    });

    // Générez un token d'authentification pour l'utilisateur
    userToken = generateAuthToken(user); // Votre méthode d'authentification
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new reservation successfully', async () => {
    const reservationData = {
      listingId: '60b8d295f5c1e9b7f3b3f1b6', // Exemple d'ID de listing
      startDate: '2024-12-01',
      endDate: '2024-12-10',
    };

    const response = await request(app)
      .post('/api/reservations')
      .set('Authorization', `Bearer ${userToken}`)
      .send(reservationData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Réservation créée avec succès');
    expect(response.body.reservation).toHaveProperty('_id');
    expect(response.body.reservation.listing).toBe(reservationData.listingId);
  });

  it('should return 500 if there is a server error', async () => {
    const response = await request(app)
      .post('/api/reservations')
      .set('Authorization', `Bearer ${userToken}`)
      .send({}); // Envoi de données invalides

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Erreur serveur');
  });
});
 */