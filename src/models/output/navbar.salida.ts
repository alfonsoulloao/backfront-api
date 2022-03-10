import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsString, ValidateNested } from "class-validator";
import { Header } from "../envelop";

export class NavBarSalida {
    @ApiProperty()
    @IsString({ message: 'Parametro requeriodo de tipo string' })    
    valoresNavBar:MenuDataSalidaNabvarDto[];  
}

export class NavBarSalidaEnvelop {
    @ApiProperty()
    @ValidateNested()
    @Type(() => Header)
    header: Header;
    
    @ApiProperty()
    @IsDefined()
    body: NavBarSalida;
}

//salida del procedimiento
export interface MenuDataSalidaDto {
    idMenu: number;
    tituloMenu: string;
    iconoMenu: string;
    idSubMenu: number;
    subMenu:  string;
    url:  string;
    estado:  number;
}
export type IResponseMenuSalidaDto = MenuDataSalidaDto;


//para obtener el menu
export interface MenuDataSalidaNabvarDto {
  
    idMenu: number;
    tituloMenu:  string;
    iconoMenu:  string;
    subemenu:   SubmenuNavarDto[];  
}
export type IResponseMenuDataSalidaNabvarDto = MenuDataSalidaNabvarDto;

//para obtener el submenu
export interface SubmenuNavarDto {
    
    idMenu: number;
    idSubMenu: number;
    subMenu:  string;
    url:  string;
    estado:  number;
}
export type IResponseSubmenuNavarDto = SubmenuNavarDto;



