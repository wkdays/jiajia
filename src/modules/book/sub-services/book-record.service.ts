import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBookRecordDto } from '../dto/book.dto';

@Injectable()
export class BookRecordService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookRecordDto) {
    return this.prisma.bookRecord.create({
      data: {
        ...dto,
        studyDate: dto.studyDate ? new Date(dto.studyDate) : undefined,
      } as any,
    });
  }

  async findByBook(bookId: number) {
    return this.prisma.bookRecord.findMany({
      where: { bookId },
      include: {
        relations: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.bookRecord.delete({ where: { id } });
  }
}
