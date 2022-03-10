import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, ValidateNested } from "class-validator";
import { Header } from "../envelop";

export class NavBarInput {
    @ApiProperty()
    @IsInt({ message: 'Parametro requeriodo de tipo numerico' })    
    usuarioId:number;
       
}

export class NavBarInputEnvelop {
    @ApiProperty()
    @ValidateNested()
    @Type(() => Header)
    header: Header;
    
    @ApiProperty()
    @IsDefined()
    body: NavBarInput;
}