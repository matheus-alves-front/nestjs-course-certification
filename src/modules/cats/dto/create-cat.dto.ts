import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator'

export class CreateCatDto {
  @ApiProperty({ description: 'Name of the cat' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The type of the cat' })
  @IsString()
  readonly brand: string;
  
  @ApiProperty({ description: 'The Colors of the cat' })
  @IsString({ each: true })
  readonly flavors: string[];
}
