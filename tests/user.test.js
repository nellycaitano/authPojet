const request = require("supertest");
const app = require("../server"); // Chemin vers votre fichier principal
const User = require("../models/User");
const { verifyToken } = require("../config/jwt");
require("dotenv").config();
const BlacklistedToken = require("../models/BlackListedToken");

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
  