import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsString, ValidateNested } from "class-validator";

class DataValidation {
    
    @ApiProperty()
    @IsString({message:'debe contener el parámetro ip'})
    ip: string;

    @ApiProperty()
    @IsString({message:'debe contener el parámetro server'})
    server: string;

    @ApiProperty()
    @IsString({message:'debe contener la fecha de inicio '})
    startDate

    @ApiProperty()
    @IsString({message:'debe contener la fecha de termino'})
    endDate
}


export class Header {  
    
    @ApiProperty()
    @ValidateNested()
    @Type(() => DataValidation)
    dataValidation: DataValidation;   
       
}


export class Envelop {            
    @ApiProperty()    
    @ValidateNested()
    @Type(() => Header)
    header: Header;  

    @ApiProperty()    
    @IsDefined()
    body: any;
}

interface DetalleError{
    level: string;
    type: string;
    backend: string;
    code: string;
    description: string;
}



interface Error{
    type: string;
    description: string,
    detail: DetalleError[],
}


interface BodyError{
    error: Error;
}


interface HeaderRetorno {
    dataValidation: DataValidation;    
}

export interface EnvelopError {
    header: HeaderRetorno;
    body: BodyError;
}

export interface EnvelopRetorno {
    header: HeaderRetorno;
    body: any;
}

export type IEnvelopRetorno = EnvelopRetorno;
export type IEnvelopError = EnvelopError;