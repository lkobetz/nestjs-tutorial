import { TypeOrmModule } from "@nestjs/typeorm";

// import { Type } from 'class-transformer'
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // 'type' below would be necessary if we didn't use enableImplicitConversion in main.ts
  // @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  offset: number;
}
