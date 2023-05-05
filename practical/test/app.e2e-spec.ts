import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { mockApiKeys } from '../src/utils/mockData';

// Basic tests as required in the practical challenge
// Below tests are testing following endpoints:
// - GET /
// - GET /transactions/last/:page
// - GET /transactions/last/:page/:limit
// - GET /transactions/address/:address
// - GET /transactions/balance/:address
// Also testing authentication with api key (mockapi keys are stored inside src/utils/mockData.ts)
// and throttling
// The DB should contain at least 100 transactions to pass all tests

// DB insertions are not tested here, but could be tested using mock data
// Same goes for the proper balance calculation result and number of txs returned for an address

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Test root path
  it('should respond basic text (GET)', (done) => {
    request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
      .end(done)
  });

  // Test /transactions/last/:page path to retrieve last 100 txs
  it('should not authorize request without api key (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions/last/1')
      .expect(401) // Unauthorized
  });
  it('should not authorize request with invalid api key (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions/last/1')
      .set('apiKey', 'invalid')
      .expect(401) // Unauthorized
  });
  it('should authorize request with api key (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions/last/1')
      .set('apiKey', mockApiKeys[0])
      .expect(200)
  });
  // transactions table should have 100 txs minimum
  it('should retrieve 100 txs by default (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions/last/1')
      .set('apiKey', mockApiKeys[0])
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveLength(100);
      });
  });

  // Test /transactions/last/:page/:number path to retrieve last n txs
  it('should retrieve the number of txs requested (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions/last/1/30')
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveLength(30);
      });
  });

  // Test /transactions/address/:address path to retrieve txs by address
  it('should retrieve txs by address (GET)', () => {
    const firstTx = request(app.getHttpServer())
      .get('/transactions/last/1/1')
      .expect(200)

    return request(app.getHttpServer())
      .get(`/transactions/address/${firstTx['sender']}`)
      .set('apiKey', mockApiKeys[0])
      .expect(200)
  });
  it('should respond even if address not found (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions/address/invalid')
      .set('apiKey', mockApiKeys[0])
      .expect(200)
  });

  // Test /transactions/balance/:address path to retrieve address balance
  it('should retrieve address balance (GET)', () => {
    const firstTx = request(app.getHttpServer())
      .get('/transactions/last/1/1')
      .set('apiKey', mockApiKeys[0])
      .expect(200)

    return request(app.getHttpServer())
      .get(`/transactions/balance/${firstTx['sender']}`)
      .set('apiKey', mockApiKeys[0])
      .expect(200)
  });
  it('should respond even if address not found (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions/balance/invalid')
      .set('apiKey', mockApiKeys[0])
      .expect(200)
  });

  // Test server throttling, limited to 10 requests per minute
  it('should reject if too many requests (GET)', () => {
    const limit = 10;
    
    for (let i = 0; i <= limit+1; i++) {
      if (i == limit+1) {
        request(app.getHttpServer())
          .get('/transactions/')
          .expect(429) // Too Many Requests
      } else {
        request(app.getHttpServer())
          .get('/transactions/')
          .expect(200)
      }
    }
  });

  afterEach(async () => {
    await app.close();
  });
});
