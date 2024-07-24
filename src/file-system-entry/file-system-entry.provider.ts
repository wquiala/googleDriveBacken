import { Connection } from 'mongoose';
import { FileSystemEntrySchema } from './entities/file-system-entry.entity';

export const FileSystemEntryProviders = [
  {
    provide: 'FileSystemEntry_Model',
    useFactory: (connection: Connection) =>
      connection.model('FileSystemEntry', FileSystemEntrySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
