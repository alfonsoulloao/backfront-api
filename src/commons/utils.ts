import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as moment from 'moment-timezone';
import { IEnvelopError, IEnvelopRetorno } from "src/models/envelop";
import { IMensajeSalida } from 'src/models/mensajeSalida';



/**  
 * da formato a fechas metodo generico
*/
export const formatoFecha = (fecha: string) => {
    var fechaConFormato = "";
    if (fecha === null) {
        fechaConFormato = "";
    }
    else {
        if (fecha != ' ') {
            fechaConFormato = moment.tz(fecha, 'America/Santiago').format('YYYY-MM-DDTHH:mm:ss.SSSSSSS');
        }
    }
    return fechaConFormato;
};


/** 
 * transforma fechas con formato 
 */
export const convertStringToDate = (fecha: string) => {
    try {
        let fechaDate: Date;
        if (fecha === null) {
            return null;
        }
        else {            
            let fechaConFormato: string = moment.tz(fecha, 'America/Santiago').format('YYYY-MM-DD-HH-mm-ss');
            let array: string[] = fechaConFormato.split("-");
            fechaDate = new Date(parseInt(array[0]), parseInt(array[1]), parseInt(array[2]), parseInt(array[3]), parseInt(array[4]), parseInt(array[5]));
            return fechaDate;
        }
    } catch (error) {
        return null;
    }
};


/** 
 * indica la fecha actual del sistema, creado para consumo generico
 */
export const fechaActual = () => {
    var fechaConFormato = "";
    // tomamos la fecha y hora del sistema
    let fecha = new Date();
    // le damos formato a la fecha y hora
    fechaConFormato = moment.tz(fecha, 'America/Santiago').format('YYYY-MM-DDTHH:mm:ss.SSSSSSS');
    return fechaConFormato;
};




/**
 * realiza mapeo de valores para salida con formato  
*/
export function formatoSalida(envelop: any, startDate: string, data: any) {
    return {
        header: {            
            dataValidation: {
                ip: envelop.header.dataValidation.ip,
                server: envelop.header.dataValidation.server,                 
                startDate: startDate,
                endDate: envelop.header.endDate,                
            }
        },
        body: data
    };
}




/** 
 * realiza mapeo de valores para salida con formato para los errores
 */
 export function formatoError(exception: any, envelop: any,startDate: string, path: string, method: string) {
    return {
        header: {            
            transactionData: {
                ip: envelop.header.dataValidation.ip,
                server: envelop.header.dataValidation.server,                  
                startDate: startDate,
                endDate: envelop.header.endDate,                
            }
        },
        body: {
            error: {
                description: `Error al consumir el servicio con el metodo ${method} y la ruta ${path}, ${exception.message}`,
                type: "Functional",
                detail: [{
                    level: "Fatal",
                    type: "Functional",
                    backend: exception.__proto__.constructor.name,
                    code: exception.status + '',
                    description: exception.stack
                }]

            }
        }
    };
 }



export function formatoInput<T>(data: T) {
    return {
        header: {
            dataValidation: {
               
                ip: "1",
                server: "saitama",
                startDate: "80",
                endDate: "12"
            },
        },
        body: data
    };
}



/** 
 * 
 * entrega mensaje de salida con un status, valor generico para respuestas
 * 
*/
export function respuestaRetorno(exito: boolean, mensaje: string = "") {
    let estado: string = "NO-OK";
    if (exito) {
        estado = "OK";
    }
    let retorno: IMensajeSalida = {
        estado: estado,
        mensaje: mensaje
    }
    return retorno;
}

