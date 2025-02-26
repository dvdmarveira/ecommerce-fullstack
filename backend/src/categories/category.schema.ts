import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  constructor(name: string, description?: string) {
    super();
    this.name = name;
    this.description = description || ""; // Se não passar descrição, usa string vazia
  }
}

export const CategorySchema = SchemaFactory.createForClass(Category);
