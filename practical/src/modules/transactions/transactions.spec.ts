import { Transaction } from "./transactions.entity";

describe('Transactions', () => {
  it('should be defined', () => {
    expect(new Transaction()).toBeDefined();
  });
});
