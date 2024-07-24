import { Test, TestingModule } from '@nestjs/testing';
import { FilesystementryserviceService } from './filesystementryservice.service';

describe('FilesystementryserviceService', () => {
  let service: FilesystementryserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesystementryserviceService],
    }).compile();

    service = module.get<FilesystementryserviceService>(FilesystementryserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
