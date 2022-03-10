import { Body, Controller, Post, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TyGException } from 'src/commons/errors/exception';
import { RequestInterceptor } from 'src/commons/interceptor/requestResponse.interceptor';
import { ValidacionEntrada } from 'src/commons/pipes/validacion-entrada.pipe';
import { validarInput } from 'src/commons/validacion-entrada';
import { LoginInput, LoginInputEnvelop } from 'src/models/inputs/loginInput';
import { NavBarInput, NavBarInputEnvelop } from 'src/models/inputs/navBarInput';
import { UsuarioRolVabInput, UsuarioRolVabInputEnvelop } from 'src/models/inputs/usuarioRolNabvarInput';
import { LoginSalida } from 'src/models/output/login.salida';
import { NavBarSalida } from 'src/models/output/navbar.salida';
import { LoginService } from 'src/services/login.service';

@ApiTags('core')
@Controller('api/v1.0/core')
@UseInterceptors(RequestInterceptor)
@UsePipes(ValidacionEntrada)
export class LoginController {

    constructor(private readonly _serviceLogin:LoginService){}

  /**
   * metodo para validar login
   */
  @ApiOperation({ summary: 'Realiza validacion del login' })
  @Post('/usuarioLogin')
  async login(@Body() envelop:LoginInputEnvelop) {    
    try {      
      // let loginResult: IResponseLoginSalida;
      //convierto los datos del cuerpor en una clase tipada con validacion
      let input:LoginInput = envelop.body;     
      
      // realizo la validacion de losparametros tipados
      await validarInput(input, "LoginInput");
      
      // consumo el metodo de services entregando valor solicitado (input) de un tipo espesifico
      let loginResult= await this._serviceLogin.loginService(envelop);          
      
      let reultadoCuerpo: Object ={
        loginResult
     }    
      return reultadoCuerpo
    } catch (err) {
      console.log(err);
      throw new TyGException(`${err}`);
    }
  }


  /**
   * metodo para validar login
   */
   @ApiOperation({ summary: 'Realiza validacion del login' })
   @Post('/navegacionUsuarioRol')
   async navegacionUsuarioRol(@Body() envelop:NavBarInputEnvelop) {    
     try {      
      let result: NavBarSalida;
       //convierto los datos del cuerpor en una clase tipada con validacion
       let input:NavBarInput = envelop.body;     
       
       // realizo la validacion de losparametros tipados
       await validarInput(input, "NavBarInput");
       
       // consumo el metodo de services entregando valor solicitado (input) de un tipo espesifico
       return await this._serviceLogin.navegacionUsuarioRol(envelop);          
     } catch (err) {
       console.log(err);
       throw new TyGException(`${err}`);
     }
   }

}
