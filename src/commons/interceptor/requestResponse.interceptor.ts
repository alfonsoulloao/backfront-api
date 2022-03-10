import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import {  catchError, map, Observable, throwError } from 'rxjs';
import { TyGException, TyGNotFoundException } from '../errors/exception';
import { fechaActual, formatoError, formatoSalida } from '../utils';

@Injectable()
export class RequestInterceptor implements NestInterceptor {    
    
    // variable para guardar el inicio de una solicitud
    private startDate: string;
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {   
        this.startDate = fechaActual();     
       
        // retornamos el handler
        return next
            .handle()
            .pipe(
                map((data) => {   
                    
                     // destructuramos el cuerpo del request                               
                     let { body } = context.switchToHttp().getRequest();

                     // aplicamos el formato a la respuesta de la solicitud
                     let retorno = formatoSalida(body, this.startDate, data);  
                     let response = context.switchToHttp().getResponse();
                     response.status(200);                    
                     // retornamos la respuesta de la solicitud
                     return retorno;                   
                }),
                catchError(err => {                                                        
                    // destructuramos el cuerpo del request                                                   
                    let request = context.switchToHttp().getRequest();
                    // capturamos el path del servicio
                    let path = request.url;
                    // capturamos el metodo
                    let method = request.method;

                    // aplicamos el formato al error en la solicitud
                    let retorno = formatoError(err, request.body,this.startDate, path, method);                    

                    if (err.__proto__.constructor.name === 'TyGFoundException') {   
                        return throwError(new TyGNotFoundException(retorno));
                    }
                    else{
                        return throwError(new TyGException(retorno));
                    }
                })
            );
    }
}