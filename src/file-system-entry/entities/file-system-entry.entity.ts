import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Types {
  Folder = 'folder',
  File = 'file',
}

@Schema()
export class FileSystemEntry extends Document {
  @Prop({
    index: true,
    required: true,
  })
  name: string;

  @Prop({ index: true })
  parent: string;

  @Prop({
    index: true,
  })
  type: Types.File | Types.Folder;

  @Prop({
    index: true,
  })
  path: string;

  @Prop()
  secureUrl: string;
}

export const FileSystemEntrySchema =
  SchemaFactory.createForClass(FileSystemEntry);
