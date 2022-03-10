import { Injectable } from '@nestjs/common';
import { endpoints } from 'src/commons/environments';
import { TyGException } from 'src/commons/errors/exception';
import { ServiceCaller } from 'src/commons/serviceCaller/service-caller';
import {  LoginInputEnvelop } from 'src/models/inputs/loginInput';
import { NavBarInputEnvelop } from 'src/models/inputs/navBarInput';
import { IResponseDatosUsuariosSalida, IResponseLoginSalida, LoginSalida } from 'src/models/output/login.salida';
import { MenuDataSalidaDto, MenuDataSalidaNabvarDto, NavBarSalida, SubmenuNavarDto } from 'src/models/output/navbar.salida';

@Injectable()
export class LoginService {
   constructor(private readonly call: ServiceCaller){}

    async loginService(input:LoginInputEnvelop){      
       let resultLogin : IResponseLoginSalida = null;
       let resultUsuarios : IResponseDatosUsuariosSalida = null;
       let resultLoginSalida : LoginSalida = null;
      try { 
         // consulto los datos del login 
         resultLogin =  await this.call.post(`${endpoints.URL_BACKEND}${endpoints.URL_BACKEND_PATH}login`,input).then((data)=>{
            // evaluo si es nulo o no y paso los datos 
            // if(data!= null){ return data.body.loginResul}else{resultLogin = null;}
            return data.body == null ? resultLogin : resultLogin = data.body.loginResul
         }); 
         
         // evaluo si el usuario se logueo correctamente 
         if(resultLogin.estado == 'ok'){
            
            //llamo al servicio para obtener los datos del usuario 
            resultUsuarios =  await this.call.post(`${endpoints.URL_BACKEND}${endpoints.URL_BACKEND_PATH}antecedenteUsuarios`,input).then(data=>{
               // evaluo si es nulo o no ? y paso los datos 
                  return  data.body == null ? resultUsuarios :resultUsuarios = data.body.consultaUsuario                        
            });                        
         }

         resultLoginSalida = { dataLogin:resultLogin, datosUsuarios:resultUsuarios}
                        
         return resultLoginSalida;
      } catch (err) {         
         console.log(err);         
         throw new TyGException(`${err}`);
      }       
   }



   async navegacionUsuarioRol(input:NavBarInputEnvelop){  
      // esta clase contiene los valores retornados del servicio 
      let resultNavBar : MenuDataSalidaDto[]= [];
      let salidaMenu: NavBarSalida = null;         
     try {      
        
      resultNavBar = await this.call.post(`${endpoints.URL_BACKEND}${endpoints.URL_BACKEND_PATH}usuarioRol`,input).then(data=>{                  
         return data.body == null ? resultNavBar : resultNavBar = data.body.resultUserRol        
      });
      
      //para obtener las cabeceras
      let menuArray :MenuDataSalidaNabvarDto[]=[]; 
      resultNavBar.forEach(e => {
        
         let principalMenu :MenuDataSalidaNabvarDto = {
            idMenu: e.idMenu,
            tituloMenu: e.tituloMenu,
            iconoMenu:e.iconoMenu,
            subemenu:[]             
         };         
         if(menuArray.length == 0 && !menuArray.includes(principalMenu)){
            menuArray.push(principalMenu);      
         }else{

            let cont:number=0;

            menuArray.forEach(e => {
               if(e.idMenu == principalMenu.idMenu ){
                  cont++
               }
            });

            if(cont == 0){
               menuArray.push(principalMenu);
            }
         }
      });


      // para obtener los subMenus
      let subMenuArray :SubmenuNavarDto[]=[]; 
      resultNavBar.forEach(e => {
        
         let subMenu :SubmenuNavarDto = {
            idMenu: e.idMenu,
            idSubMenu:e.idSubMenu,
            subMenu:e.subMenu,
            url:e.url,
            estado:e.estado
         };         
         if(subMenuArray.length == 0 && !subMenuArray.includes(subMenu)){
            subMenuArray.push(subMenu);      
         }else{

            if(!subMenuArray.includes(subMenu)){
               subMenuArray.push(subMenu);
            }
         }
      });

      //uno los valores al arreglo que le pertenece
      for (let i = 0; i < menuArray.length; i++) {

         for (let b = 0; b < subMenuArray.length; b++) {
            if(menuArray[i].idMenu == subMenuArray[b].idMenu ){
                  menuArray[i].subemenu.push(subMenuArray[b])
            }            
         }         
      }


      // resultLoginSalida = { dataLogin:resultLogin, datosUsuarios:resultUsuarios}
      salidaMenu ={ valoresNavBar: menuArray }
      // resultNavBarSalida = {valoresNavBar:resultNavBar}
      
      return salidaMenu

     } catch (err) {         
        console.log(err);         
        throw new TyGException(`${err}`);
     }       
  }





}
