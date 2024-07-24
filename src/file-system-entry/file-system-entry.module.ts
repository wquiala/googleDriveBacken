import { Module } from '@nestjs/common';
import { FileSystemEntryService } from './file-system-entry.service';
import { FileSystemEntryController } from './file-system-entry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DataBaseModule } from 'src/data-base/data-base.module';
import { FileSystemEntryProviders } from './file-system-entry.provider';

@Module({
  imports: [DataBaseModule],
  controllers: [FileSystemEntryController],
  providers: [FileSystemEntryService, ...FileSystemEntryProviders],
})
export class FileSystemEntryModule {}
