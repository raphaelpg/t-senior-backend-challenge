import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { mockApiKeys } from '../src/utils/mockData';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/trasactions/last/1/30 (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions/last/1/30')
      .expect(200)
  });

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

});
