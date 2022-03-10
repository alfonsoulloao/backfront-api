import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsString, ValidateNested } from "class-validator";
import { Header } from "../envelop";

export class UsuarioRolVabInput {
    @ApiProperty()
    @IsString({ message: 'Parametro requeriodo de tipo string' })    
    rutUsuario:string;
       
}

export class UsuarioRolVabInputEnvelop {
    @ApiProperty()
    @ValidateNested()
    @Type(() => Header)
    header: Header;
    
    @ApiProperty()
    @IsDefined()
    body: UsuarioRolVabInput;
}