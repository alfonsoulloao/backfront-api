/**
 * Copyright 2020 Agilesoft (http://www.agilesoft.cl)
 *
 * Variables de entorno que requiere el sistema
 */

 export const MODULE_ID = 'PB';
 export const COMMON_MODULE = 'comun';
 export const CHANNEL_ID = 'C_0000WEB';
 export const AGENCY_ID = 'web001';
 export const AFILIADO = 'Afiliado';
 
 export const environments = {     
     
     PORT: process.env.PORT || 3500,
     TIMEOUT: Number(process.env.TIMEOUT) || 30000,     
     parameter: {
         chacheMinutes: Number(process.env.PARAMETER_CACHE_MINUTES) || 5,
         secretKey: process.env.PARAMETER_MODULE_SECRET,
         commonSecretKey: process.env.PARAMETER_COMMON_SECRET,
     }    
 };
 
 export const endpoints = {
     URL_BACKEND: process.env.URL_BACKEND || 'http://localhost:3000/api/v1.0/',         
     URL_BACKEND_PATH: process.env.URL_BACKEND || 'core/',         
     VERSION_ACCIONES : process.env.VERSION_ACCIONES || 'v1.0/',          
     ID_APLICACION : process.env.ID_APLICACION || '7936B35DF5CA49BF971006E4E8E3009C'
 };
 