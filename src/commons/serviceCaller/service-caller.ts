import { Injectable } from "@nestjs/common";
import * as request from "request-promise-native";
import { TyGException } from "../errors/exception";

@Injectable()
export class ServiceCaller {

    async post(url: string, body:any) { return this.callRESTService(url, 'POST', body) }
    async get(url: string) { return this.callRESTService(url, 'GET', {}) }
    async patch(url: string, body: any) { return this.callRESTService(url, 'PATCH', body) }
    async put(url: string, body: any) { return this.callRESTService(url, 'PUT', body) }

    private async callRESTService(url: string, method: string, body: any) {
        const options = {
            uri: url,
            method: method,
            timeout: 30000,        
            json: body || true,
            resolveWithFullResponse: true,
            simple: false            
        }

        try {
            const response = await request(options)
            return response.body
        } catch (err) {                           
            throw new TyGException(`${err}`);            
        }
    }
}


@Injectable()
export class ServiceCallerAxios {

    async post(url: string, body:any) { return this.callRESTService(url, 'POST', body) }
    async get(url: string) { return this.callRESTService(url, 'GET', {}) }
    async patch(url: string, body: any) { return this.callRESTService(url, 'PATCH', body) }
    async put(url: string, body: any) { return this.callRESTService(url, 'PUT', body) }

    private async callRESTService(url: string, method: string, body: any) {
        const options = {
            uri: url,
            method: method,
            timeout: 30000,        
            json: body || true,
            resolveWithFullResponse: true,
            simple: false            
        }

        try {
            const response = await request(options)
            return response.body
        } catch (err) {                           
            throw new TyGException(`${err}`);            
        }
    }
}


