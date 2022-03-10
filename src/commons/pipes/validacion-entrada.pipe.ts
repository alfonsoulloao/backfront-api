import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { TyGException } from '../errors/exception';

@Injectable()
export class ValidacionEntrada implements PipeTransform<object> {
  async transform(value: any, metadata: ArgumentMetadata) {
    // destructuramos los metadatos del type de la clase a validar
    let { metatype } = metadata;
    // valida que sea una clase, si no es asi retorna el valor sin validacion
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    
    // genera el objeto asociando los metadatos
    const object = plainToClass(metatype, value);
    
    // realisa la validacion de los decoradores en la clase
    const errors = await validate(object);
    
    //recorre los errores si los hay para formatearlos
    if (errors.length > 0) {
      let error = await this.cuentaError(errors);          
      throw new TyGException(`El cuerpo de la solicitud no es valido => ${error}`);
    }
    return value;
  }

  private async cuentaError(errors: ValidationError[]) {
    let error = '';
    for (let itemError of errors) {
      let property = itemError.property;

      if (property === 'header') {
        error += this.contarErrorHeader(itemError, property);
      }

      if (property === 'body') {
        error += this.contarErrorBody(itemError, property);
      }
    }
    return error;
  }

  private contarErrorHeader(err: ValidationError, property: string) {
    let error = '';
    error += ` ${property}: { `
    for (let iteChildren of err.children) {
      let hijo = iteChildren.property;
      error += ` ${hijo}: { `;
      let cont = 0;
      for (let iteChildren2 of iteChildren.children) {
        let { isString } = iteChildren2.constraints;

        if (cont != 0) {
          error += ', ';
        }

        if (isString != undefined) {
          error += isString;
        }

        cont++;
      }
      error += ` } `;
    }
    error += ` } `;
    return error;
  }

  private contarErrorBody(err: ValidationError, property: string) {
    let error = '';
    error += ` ${property}: { `
    let cont = 0;
    for (let iteChildren of err.children) {
      let { isInt, isString } = iteChildren.constraints;

      if (cont != 0) {
        error += ', ';
      }

      if (isInt != undefined) {
        error += isInt;
      }

      if (isString != undefined) {
        error += isString;
      }
      cont++;
    }
    error += ` } `;
    return error;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
