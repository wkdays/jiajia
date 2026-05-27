import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBookBaseDto, UpdateBookBaseDto, QueryBookDto } from '../dto/book.dto';

@Injectable()
export class BookBaseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookBaseDto) {
    return this.prisma.bookBase.create({
      data: {
        ...dto,
        publishDate: dto.publishDate ? new Date(dto.publishDate) : undefined,
      },
    });
  }

  async findAll(query: QueryBookDto) {
    const { page = 1, pageSize = 20, name, author } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (name) {
      where.name = { contains: name };
    }
    if (author) {
      where.author = author;
    }

    const [items, total] = await Promise.all([
      this.prisma.bookBase.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
        include: {
          records: true,
        },
      }),
      this.prisma.bookBase.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findOne(id: number) {
    const book = await this.prisma.bookBase.findUnique({
      where: { id },
      include: {
        records: {
          include: {
            relations: true,
          },
        },
      },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: number, dto: UpdateBookBaseDto) {
    await this.findOne(id);
    return this.prisma.bookBase.update({
      where: { id },
      data: {
        ...dto,
        publishDate: dto.publishDate ? new Date(dto.publishDate) : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.bookBase.delete({ where: { id } });
  }
}
