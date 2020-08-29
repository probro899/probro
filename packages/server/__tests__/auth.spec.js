import express from 'express';
import http from 'http';
import axios from 'axios';
import appExpress from '../src/express';

const app = express();
const server = http.createServer(app);
appExpress(app);

const port = 5001;
server.listen(port);

describe('It checks the server for authentication api', () => {
  it('check for registration', async () => {
    const res = await axios.get(`http://localhost:${port}/auth/useregistration`,
      {
        params: {
          firstName: 'bhagya',
          lastName: 'sah',
          email: 'bhagyasah4u@gmail.com',
          password: 'bhagya123',
        },
      });
    expect.toString(res.data);
});
  afterAll(() => setTimeout(() => process.exit(), 1000));
});
