import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLawBaseDto, UpdateLawBaseDto, QueryLawDto } from '../dto/law.dto';

@Injectable()
export class LawBaseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLawBaseDto) {
    return this.prisma.lawBase.create({
      data: {
        ...dto,
        effectiveDate: dto.effectiveDate ? new Date(dto.effectiveDate) : undefined,
      },
    });
  }

  async findAll(query: QueryLawDto) {
    const { page = 1, pageSize = 20, search, country } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (search) {
      where.name = { contains: search };
    }
    if (country) {
      where.country = country;
    }

    const [items, total] = await Promise.all([
      this.prisma.lawBase.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
        include: {
          materialLinks: true,
        },
      }),
      this.prisma.lawBase.count({ where }),
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
    const law = await this.prisma.lawBase.findUnique({
      where: { id },
      include: {
        materialLinks: {
          include: {
            material: {
              select: { id: true, name: true },
            },
          },
        },
        updates: true,
      },
    });

    if (!law) {
      throw new NotFoundException(`Law with ID ${id} not found`);
    }

    return law;
  }

  async update(id: number, dto: UpdateLawBaseDto) {
    await this.findOne(id);
    return this.prisma.lawBase.update({
      where: { id },
      data: {
        ...dto,
        effectiveDate: dto.effectiveDate ? new Date(dto.effectiveDate) : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.lawBase.delete({ where: { id } });
  }
}
