import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileSystemEntryService } from './file-system-entry.service';
import { CreateFileSystemEntryDto } from './dto/create-file-system-entry.dto';
import { UpdateFileSystemEntryDto } from './dto/update-file-system-entry.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/helpers/fileNamer';

import { Response } from 'express';

interface Pr {
  parent: string;
}

@Controller('file-system-entry')
export class FileSystemEntryController {
  constructor(
    private readonly fileSystemEntryService: FileSystemEntryService,
  ) {}

  @Post(':id')
  copy(
    @Param('id') id: string,
    @Body() createFileSystemEntryDto: CreateFileSystemEntryDto,
  ) {
    return this.fileSystemEntryService.copy(id, createFileSystemEntryDto);
  }
  @Post()
  create(@Body() createFileSystemEntryDto: CreateFileSystemEntryDto) {
    return this.fileSystemEntryService.create(createFileSystemEntryDto);
  }

  @Get()
  findAll() {
    return this.fileSystemEntryService.findAll();
  }

  @Get('entrychild/:id')
  FindChild(@Param('id') id: string) {
    return this.fileSystemEntryService.FindChild(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log();
    return this.fileSystemEntryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileSystemEntryDto: UpdateFileSystemEntryDto,
  ) {
    return this.fileSystemEntryService.update(id, updateFileSystemEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileSystemEntryService.remove(id);
  }

  @Get('/file/:fileName')
  findFile(@Res() res: Response, @Param('fileName') filename: string) {
    const path = this.fileSystemEntryService.getFile(filename);
    res.sendFile(path);
  }

  @Post('/file/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/uploads',
        filename: fileNamer,
      }),
    }),
  )
  uploadFiles(
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
    @Body() { parent }: Pr,
  ) {
    console.log(parent);
    if (!file) throw new BadRequestException('Por favor inserte archivo');
    const secureUrl = `http://localhost:3000/api/file-system-entry/file/${file.originalname}`;
    const createdFile = this.fileSystemEntryService.uploadFile(
      file,
      parent,
      secureUrl,
    );
    return createdFile;
  }
}
