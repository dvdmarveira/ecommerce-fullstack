// backend/src/categories/dto/create-category.dto.ts
import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string; // O nome da categoria é obrigatório

  @IsString()
  @IsOptional()
  description?: string; // A descrição é opcional
}
