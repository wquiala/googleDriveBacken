import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () =>
      mongoose.connect(
        'mongodb+srv://wilfredoquiala:MSF33DaYKj1sz3Y8@cluster0.v25i4dh.mongodb.net/drive',
      ),
  },
];
