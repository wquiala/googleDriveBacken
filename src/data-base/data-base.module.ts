import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/dataBase/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DataBaseModule {}
