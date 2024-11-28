const request = require("supertest");
const app = require("../server"); // Chemin vers votre fichier principal
const User = require("../models/User");
const BlacklistedToken = require("../models/BlackListedToken");
const Listing = require("../models/listingModel");

const { verifyToken } = require("../config/jwt");
require("dotenv").config();

let mytoken;


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
  /*
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
  */
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