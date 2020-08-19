// this file is generated with command: nest g class coffees/dto/update-coffee.dto --no-spec

import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto'

// to specify expected input object shape for coffees controller
// readonly property maintains immutability
// ? in typescript makes the field optional (we may want to update some properties but not others)

// PartialType takes type passed in and sets all properties to optional to avoid having to copy and paste and add the ?

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {
}
