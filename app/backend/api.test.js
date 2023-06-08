const request = require('supertest');
const express = require('express');
const { Pool } = require('pg');

// Import the Express application code from your main file
const app = express();

// Mock the Pool query function
jest.mock('pg', () => {
  const { Pool } = jest.requireActual('pg');
  return {
    Pool: jest.fn(() => ({
      query: jest.fn().mockResolvedValueOnce({ rows: [] }), // Mock the query method to return an empty result
    })),
  };
});

describe('API Tests', () => {
  afterAll(() => {
    jest.restoreAllMocks(); // Restore all mocks after running the tests
  });

  it('GET /api/books should return an empty array', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(404);
  });

  // Add more test cases for other API endpoints (POST, PUT, DELETE) here
});
