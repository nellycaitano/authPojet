const request = require("supertest");
const app = require("../server"); // Chemin vers votre fichier principal
const User = require("../models/User");
const BlacklistedToken = require("../models/BlackListedToken");
const { verifyToken } = require("../config/jwt");
require("dotenv").config();

let mytoken;

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
/*
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
});*/
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
