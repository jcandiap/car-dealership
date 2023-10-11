import { IsString, MinLength, IsUUID, IsOptional } from "class-validator";

export class UpdateCarDTO {

    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly brand?:string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly model?:string;

}