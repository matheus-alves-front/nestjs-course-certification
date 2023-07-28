import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

// segundo parametro dos @params e @body no controller, ele recebe o valor e trata eles
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const valueParsed = parseInt(value, 10)

    if (isNaN(valueParsed)) {
      throw new BadRequestException(
        `Validation failed. ${valueParsed} is not an integer`
      )
    }

    return value;
  }
}
