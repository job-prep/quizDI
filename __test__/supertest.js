const request = require('supertest');
const fs = require('fs');
const path = require('path');
// const { get } = require('http');

const server = 'http://localhost:3000';

describe('Route Integration', () => {
  // afterAll(() => request(server)
  //   get())

  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status', () => {
        return request(server)
          .get('/')
          .expect(200);
      });
    });
  });
});