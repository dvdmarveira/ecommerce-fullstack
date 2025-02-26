// backend/src/categories/dto/update-category.dto.ts
import { IsString, IsOptional } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string; // O nome é opcional, mas se fornecido, deve ser uma string

  @IsString()
  @IsOptional()
  description?: string; // A descrição também é opcional
}
