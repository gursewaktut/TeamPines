import { fetchQuestion, sendMessageToSteamship } from '../../api/steamShip_client.js';

jest.setTimeout(15000);

describe('fetchQuestion', () => {
    test('returns a question object', async () => {
      // Call the fetchQuestion function
      const question = await fetchQuestion(0);
      //console.log(question);
      // Check if the returned value is an object and has a text property
      expect(typeof question).toBe('object');
      expect(question).toHaveProperty('text');
    });
});

describe('sendMessageToSteamship', () => {
    test('returns the expected response', async () => {
      const message = 'Test message';
      const response = await sendMessageToSteamship(message);
      expect(typeof response).toBe('string');
    }, 15000);
});
