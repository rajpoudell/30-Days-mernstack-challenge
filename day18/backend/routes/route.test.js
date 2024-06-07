const request = require('supertest');
const app = require('../index');  // Adjust path if necessary

describe("POST /data", () => {
  // Increase timeout for potentially long tests
  jest.setTimeout(10000);

  it("should create a product", async () => {
    const res = await request(app)
      .post("/data")
      .send({ name: "Raj" })  // Ensure the payload is correct
      .expect(201);  // Check for status code 201

    expect(res.body.message).toBe('Hello, Raj!');  // Verify the response body
  });

  it("should respond with 400 if name is missing", async () => {
    const res = await request(app)
      .post("/data")
      .send({})  // Sending an empty payload
      .expect(400);  // Expecting a 400 status code

    expect(res.body.error).toBe('Name is required');  // Check the error message
  });

  // Clean up any remaining asynchronous operations
  afterAll((done) => {
    app.close(done);
  });
});
