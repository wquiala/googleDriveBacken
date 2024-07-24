import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateFileSystemEntryDto } from './dto/create-file-system-entry.dto';
import { UpdateFileSystemEntryDto } from './dto/update-file-system-entry.dto';
import { Model, isValidObjectId } from 'mongoose';
import { FileSystemEntry, Types } from './entities/file-system-entry.entity';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileSystemEntryService {
  constructor(
    @Inject('FileSystemEntry_Model')
    private readonly fileSystemEntryModel: Model<FileSystemEntry>,
  ) {}

  async create(createFileSystemEntryDto: CreateFileSystemEntryDto) {
    const { name: nameDTO, parent: parentDTO } = createFileSystemEntryDto;
    const nameEntryDb = await this.fileSystemEntryModel
      .where({ parent: parentDTO })
      .findOne({ name: nameDTO });
    if (nameEntryDb) throw new BadRequestException('Nombres duplicados');
    let entry;
    let pathP: string;
    let data;
    if (isValidObjectId(parentDTO)) {
      entry = await this.fileSystemEntryModel.findOne({
        _id: parentDTO,
      });

      if (entry) {
        pathP = `${entry.path}/${entry.name}`;
        data = { ...createFileSystemEntryDto, type: Types.Folder, path: pathP };
      }
    } else {
      data = {
        ...createFileSystemEntryDto,
        type: Types.Folder,
        path: '/',
        parent: '/',
      };
    }

    try {
      const fileSystemEntry = await this.fileSystemEntryModel.create(data);

      return fileSystemEntry;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Error de llaves duplicadas en database ${JSON.stringify(
            error.keyValue,
          )}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(`No se puede crear el directorio`);
    }
  }

  async findAll() {
    const fileSystemEntry = await this.fileSystemEntryModel.find({
      parent: '/',
    });

    return fileSystemEntry;
  }

  async FindChild(id: string) {
    const child = await this.fileSystemEntryModel.find({ parent: id });
    return child;
  }

  async findOne(id: string) {
    const fileSystemEntry = await this.fileSystemEntryModel.findById(id);

    return fileSystemEntry;
  }

  async update(id: string, updateFileSystemEntryDto: UpdateFileSystemEntryDto) {
    const { name, parent, type } = updateFileSystemEntryDto;
    const nameEntryDb = await this.fileSystemEntryModel
      .where({ parent })
      .findOne({ name });
    if (nameEntryDb) throw new BadRequestException('Nombres duplicados');
    let updated = {};
    let entry;
    let pathP = '';
    if (type === 'folder') {
      if (parent && isValidObjectId(parent)) {
        entry = await this.fileSystemEntryModel.findOne({
          _id: parent,
        });
        entry ? (pathP = `${entry.path}/${entry.name}`) : (pathP = '/');
        updated = await this.fileSystemEntryModel.findByIdAndUpdate(id, {
          name,
          parent,
          path: pathP,
        });
      }

      return updated;
    }
    if (type === 'file') {
      if (parent && isValidObjectId(parent)) {
        entry = await this.fileSystemEntryModel.findOne({
          _id: parent,
        });
        entry ? (pathP = `${entry.path}/${entry.name}`) : (pathP = '/');
        updated = await this.fileSystemEntryModel.findByIdAndUpdate(id, {
          name,
          parent,
          path: pathP,
        });
        return updated;
      }
    }
    /* const fileSystemEntry = await this.fileSystemEntryModel.findByIdAndUpdate(
      id,
      updateFileSystemEntryDto,
    ); */
  }

  async copy(id: string, createFileSystemEntryDto: CreateFileSystemEntryDto) {
    return id;
  }

  async remove(id: string) {
    await this.fileSystemEntryModel.findByIdAndDelete(id);
    const child = await this.fileSystemEntryModel.find({ parent: id });
    child.forEach(async (element) => {
      await this.fileSystemEntryModel.findByIdAndDelete(element.id);
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    parent: string,
    secureUrl: string,
  ) {
    /*     const parent = '/';
     */ //const { parent } = createFileSystemDto;
    const { originalname, mimetype } = file;
    console.log(file);

    const nameEntryDb = await this.fileSystemEntryModel
      .where({ parent })
      .findOne({ name: originalname });
    if (nameEntryDb) throw new BadRequestException('Nombres duplicados');
    let entry;
    let pathP: string;
    let data;

    if (isValidObjectId(parent)) {
      entry = await this.fileSystemEntryModel.findOne({
        _id: parent,
      });

      if (entry) {
        pathP = `${entry.path}/${entry.name}`;
        data = {
          name: originalname,
          type: `${mimetype.split('/')[1]}`,
          secureUrl,
          path: pathP,
          parent,
        };
      }
    } else {
      data = {
        name: originalname,
        type: `${mimetype.split('/')[1]}`,
        secureUrl,
        path: '/',
        parent: '/',
      };
    }

    try {
      const fileSystemEntry = await this.fileSystemEntryModel.create(data);

      return fileSystemEntry;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Error de llaves duplicadas en database ${JSON.stringify(
            error.keyValue,
          )}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(`No se puede crear el directorio`);
    }
  }

  getFile(fileName: string) {
    const path = join(__dirname, '../../static/uploads/', fileName);
    console.log(path);

    if (!existsSync(path)) throw new BadRequestException('No file found');

    return path;
  }
}
