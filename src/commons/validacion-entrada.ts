import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { LoginInput } from 'src/models/inputs/loginInput';
import { NavBarInput } from 'src/models/inputs/navBarInput';
import { UsuarioRolVabInput } from 'src/models/inputs/usuarioRolNabvarInput';
import { TyGNotFoundException } from './errors/exception';

export async function validarInput(input: any, clase: string) {
  try {
    let object: any;

    switch (clase) {
      case 'LoginInput':
        object = plainToClass(LoginInput, input);
        break;
      case 'UsuarioRolVabInput':
        object = plainToClass(UsuarioRolVabInput, input);
        break;
      case 'NavBarInput':
        object = plainToClass(NavBarInput, input);
        break;
      default:
        break;
    }
    const errors = await validate(object);
    if (errors.length > 0) {
      contarErrores(errors);
    }
  } catch (error) {
    throw new TyGNotFoundException(error);
  }
}

function contarErrores(errors: ValidationError[]) {
  let error = '';
  let cont = 0;
  for (let item of errors) {
    if (item.constraints) {
      let { isInt, isString, isArray } = item.constraints;

      if (cont != 0) {
        error += ', ';
      }

      if (isInt != undefined) {
        error += isInt;
      }

      if (isString != undefined) {
        error += isString;
      }

      if (isArray != undefined) {
        error += isArray;
      }
      cont++;
    }
  }
  throw new TyGNotFoundException(error);
}
