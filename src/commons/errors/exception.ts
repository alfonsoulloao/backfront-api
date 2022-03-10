import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * metodo para contener los errores genericos
 */
export class TyGException extends HttpException {
    constructor(objectOrError?: string | object | any) {
        super(objectOrError, HttpStatus.BAD_GATEWAY);
    }
}

/**
 *  metodo para contener los errores 404
 */
export class TyGNotFoundException extends HttpException {
    constructor(objectOrError?: string | object | any) {
        super(objectOrError, HttpStatus.NOT_FOUND);
    }
}
