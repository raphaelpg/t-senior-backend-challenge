import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { mockApiKeys } from '../../utils/mockData';
import { config } from '../../config/config';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, config.auth.apiKeyName) {
    constructor() {
        super({ header: config.auth.apiKeyName, prefix: '' },
        true,
        async (apiKey, done) => {
            return this.validate(apiKey, done);
        });
    }

    public validate = (apiKey: string, done: (error: Error, data) => {}) => {
        if (mockApiKeys.includes(apiKey)) {
            done(null, true);
        }
        done(new UnauthorizedException(), null);
    }
}