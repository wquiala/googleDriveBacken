import { Test, TestingModule } from '@nestjs/testing';
import { FileSystemEntryController } from './file-system-entry.controller';

describe('FileSystemEntryController', () => {
  let controller: FileSystemEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileSystemEntryController],
    }).compile();

    controller = module.get<FileSystemEntryController>(FileSystemEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
