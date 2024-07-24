import { Test, TestingModule } from '@nestjs/testing';
import { FileSystemEntryService } from './file-system-entry.service';

describe('FileSystemEntryService', () => {
  let service: FileSystemEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileSystemEntryService],
    }).compile();

    service = module.get<FileSystemEntryService>(FileSystemEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
