import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsString, ValidateNested } from "class-validator";
import { Header } from "../envelop";

export class LoginSalida {
    @ApiProperty()
    @IsString({ message: 'Parametro requeriodo de tipo string' })    
    dataLogin:LoginDataSalidaDto;
    
    @ApiProperty()
    @IsString({ message: 'Parametro requeriodo de tipo string' })
    datosUsuarios:DatosUsuariosDataSalidaDto;
}

export class LoginSalidaEnvelop {
    @ApiProperty()
    @ValidateNested()
    @Type(() => Header)
    header: Header;
    
    @ApiProperty()
    @IsDefined()
    body: LoginSalida;
}


export interface LoginDataSalidaDto {

    estado:string;
    clave: string;
}
export type IResponseLoginSalida = LoginDataSalidaDto;


export interface DatosUsuariosDataSalidaDto {

    idPersona: number;
    comuna: string;
    tipoDocumento: string;
    rutUsuario: string;
    correoElectronico: string;
    nombre: string;
    apellidoPaterno: string;
    apellidiMaterno: string;
    fechanacimiento: string;
    celular: string;
    planta: string;
    nacionalidad: string;
    sexo: string;
    estadoPersona: string;
    idUsuario: number;
    fechaCreacion: string;
    estadoUsuario: string;
    nombreJefatura: string;
    nombreGerente: string; 
}
export type IResponseDatosUsuariosSalida = DatosUsuariosDataSalidaDto;