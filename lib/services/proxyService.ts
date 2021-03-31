import { Request } from 'express';
import * as request from "request-promise-native";

export class proxyService {
    protected options = {
        uri: '',
        json: true,
        resolveWithFullResponse: false
    };

    protected request: request;

    constructor() {
        this.request = request;
    }
}