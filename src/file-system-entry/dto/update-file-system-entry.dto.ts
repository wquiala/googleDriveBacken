import { PartialType } from '@nestjs/mapped-types';
import { CreateFileSystemEntryDto } from './create-file-system-entry.dto';

export class UpdateFileSystemEntryDto extends PartialType(
  CreateFileSystemEntryDto,
) {}
