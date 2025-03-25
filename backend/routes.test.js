const request = require('supertest');
const express = require('express');
const routes = require('./routes'); 

// Mock the database connection
jest.mock('./database/connectDB', () => {
  const mockPool = {
    promise: () => ({
      query: jest.fn(), // Mock the query function
    }),
  };
  return {
    pool: mockPool,
    connectDb: jest.fn(),
  };
});

// Mock authentication and authorization 
jest.mock('./isAuth', () => (req, res, next) => {
  req.user = { id: 1 }; // Simulate an authenticated user
  next();
});

jest.mock('./isAutho', () => (roles) => (req, res, next) => {
  if (roles.includes(1) || roles.includes(2) || roles.includes(3) ) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
});


describe('GET /clubs', () => {
  let app;

  beforeEach(() => {
    // Create a new express app for each test to isolate the routes
    app = express();
    app.use(routes);
    app.use(express.json());
    jest.clearAllMocks(); // Reset mock function calls before each test
  });

  it('should return a list of clubs when clubs exist', async () => {
    // Mock the database query to return some club names
    const mockClubNames = [{ club_name: 'Club Africain' }, { club_name: 'Esperance Sportive Tunisie' }];
    require('./database/connectDB').pool.promise().query.mockResolvedValue([mockClubNames]);

    // Make a GET request to the /clubs endpoint
    const response = await request(app).get('/clubs');

    // Check the response status and data
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ clubs: ['Club Africain', 'Esperance Sportive Tunisie'] });
  });

  it('should return 404 if no clubs are found', async () => {
    // Mock the database query to return an empty array
    require('./database/connectDB').pool.promise().query.mockResolvedValue([[]]);

    // Make a GET request to the /clubs endpoint
    const response = await request(app).get('/clubs');

    // Check the response status and error message
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'No clubs found' });
  });

  it('should return 500 if there is a database error', async () => {
    // Mock the database query to throw an error
    require('./database/connectDB').pool.promise().query.mockRejectedValue(new Error('Database error'));

    // Make a GET request to the /clubs endpoint
    const response = await request(app).get('/clubs');

    // Check the response status and error message
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });

  it('should return 403 if the user is not authorized', async () => {
    // Mock the authorization middleware to deny access.  Adjust based on your actual auth logic.

    jest.unmock('./isAutho'); // unmock previous mock, to be able to redefine it.
    jest.mock('./isAutho', () => (roles) => (req, res, next) => {
      res.status(403).json({ error: "Unauthorized" }); // Simulate unauthorized access
    });

    // Re-mount the routes to apply the new mock.
    app = express();
    app.use(routes);
    app.use(express.json());
    // Make a GET request to the /clubs endpoint
    const response = await request(app).get('/clubs');


    // Check the response status and error message
    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Unauthorized" });

    // Restore the original mock 
    jest.unmock('./isAutho');

  });
});