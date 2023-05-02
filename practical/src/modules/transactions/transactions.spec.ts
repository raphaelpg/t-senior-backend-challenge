import { Transaction } from './transactions.entity.js';

describe('Transactions', () => {
  it('should be defined', () => {
    expect(new Transaction()).toBeDefined();
  });
});
