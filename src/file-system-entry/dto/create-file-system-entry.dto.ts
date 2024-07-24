import { IsString, MinLength } from 'class-validator';
import { Types } from '../entities/file-system-entry.entity';

export class CreateFileSystemEntryDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  parent: string;

  /* @IsDate()
  @MinDate(new Date()) */
  @IsString()
  type: Types.File | Types.Folder;

  /*   @IsString()
  path: string; */

  /* @IsDate()
  @MinDate(new Date()) */
  /* @IsString()
  lastUpdate: Date | null; */
}
