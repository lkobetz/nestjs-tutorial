// this file is generated with command: nest g class coffees/dto/create-coffee.dto --no-spec

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

// to specify expected input object shape for coffees controller
// readonly property maintains immutability

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.'})
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee.'})
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
