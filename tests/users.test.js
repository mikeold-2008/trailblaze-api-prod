const request = require('supertest')
const express = require('express');
const app = express()




describe('/users/:id', () => {

    test('GET 200: Responds with the correct user data for the relevant user ID', () => {
        const user = {
            id: expect.any(Number),
            firstName: expect.any(String)
          }
        return request(app)
        .get('/users/1')
        .expect(200)
        .then(({ body }) => {  
        expect(body).toMatchObject(article)
        })  
      })

      
      
});