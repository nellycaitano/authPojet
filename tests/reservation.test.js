const request = require("supertest");
const app = require("../server"); // Chemin vers votre fichier principal
const User = require("../models/User");
const { verifyToken, generateAccessToken } = require("../config/jwt");
require("dotenv").config();

let mytoken;

let userToken;



describe('POST /api/reservations', () => {


  beforeAll(async () => {
    await User.deleteMany();
     // Créez un utilisateur pour simuler l'authentification
     const user = await User.create({
      "username": "testUser",
      "email":"devpanrace@gmail.com",
      "password": "testPassword",
    });

     // Générez un token d'authentification pour l'utilisateur
     userToken = generateAccessToken(  {
      userId: user.id,
      email: user.email,
      role:user.role
  },); 
  });
  it('POST ', async () => {
    const reservationData = {
      "listingId": '60b8d295f5c1e9b7f3b3f1b6', // Exemple d'ID de listing
      "startDate": '2024-12-01',
      "endDate": '2024-12-10',
    };
    const response = await request(app)
      .post('/api/reservations/create')
      .set('authorization', `Bearer ${userToken}`)
      .send(reservationData);

      expect(response.status).toBe(201);
      /*
    expect(response.body.message).toBe('Réservation créée avec succès');
    expect(response.body.reservation).toHaveProperty('_id');
    expect(response.body.reservation.listing).toBe(reservationData.listingId); */
      console.log(response.body)
   });
   it('should return 500 if there is a server error', async () => {
    const response = await request(app)
      .post('/api/reservations/create')
      .set('authorization', `Bearer ${userToken}`)
      .send({}); // Envoi de données invalides

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Erreur serveur');
  });
   
  })
   


