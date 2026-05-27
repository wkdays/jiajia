import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBookRelDto } from '../dto/book.dto';

@Injectable()
export class BookRelService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookRelDto) {
    return this.prisma.bookRel.create({ data: dto as any });
  }

  async findByRecord(recordId: number) {
    return this.prisma.bookRel.findMany({
      where: { recordId },
    });
  }

  async remove(id: number) {
    return this.prisma.bookRel.delete({ where: { id } });
  }
}
