/**
 * @jest-environment node
 */
import handler from './login';
import { createMocks } from 'node-mocks-http';

describe('Login API Handler', () => {
  it('should return 200 and a success message for valid credentials', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { userId: 'user123', password: 'password123' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Login successful' });
  });

  it('should return 401 and an error message for invalid credentials', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { userId: 'user123', password: 'wrongpassword' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'Invalid credentials' });
  });

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({ message: 'Method Not Allowed' });
  });
});
