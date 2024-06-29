import { IsString } from "class-validator";

export class CreateCardDTO {
@IsString()
title: string
}
