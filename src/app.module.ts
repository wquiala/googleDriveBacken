import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileSystemEntryModule } from './file-system-entry/file-system-entry.module';
import { DataBaseModule } from './data-base/data-base.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [FileSystemEntryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
