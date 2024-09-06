import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const type = metadata.metatype

        const object = plainToInstance(type, value)
        const errors = await validate(object)

        if(errors.length > 0) {
            throw new BadRequestException("Dados invalidos!")
        }

        return value;
    }
}