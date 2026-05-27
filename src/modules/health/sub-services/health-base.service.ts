import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHealthBaseDto, UpdateHealthBaseDto, QueryHealthDto } from '../dto/health.dto';

@Injectable()
export class HealthBaseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateHealthBaseDto) {
    return this.prisma.healthBase.create({ data: dto });
  }

  async findAll(query: QueryHealthDto) {
    const { page = 1, pageSize = 20, search, type } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { symptom: { contains: search } },
      ];
    }
    if (type) {
      where.type = type;
    }

    const [items, total] = await Promise.all([
      this.prisma.healthBase.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
        include: {
          mechanisms: true,
          causes: true,
          materialLinks: {
            include: {
              material: {
                select: { id: true, name: true, alias: true },
              },
            },
          },
        },
      }),
      this.prisma.healthBase.count({ where }),
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
    const health = await this.prisma.healthBase.findUnique({
      where: { id },
      include: {
        mechanisms: true,
        causes: true,
        materialLinks: {
          include: {
            material: true,
          },
        },
        formulas: true,
      },
    });

    if (!health) {
      throw new NotFoundException(`Health problem with ID ${id} not found`);
    }

    return health;
  }

  async update(id: number, dto: UpdateHealthBaseDto) {
    await this.findOne(id);
    return this.prisma.healthBase.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.healthBase.delete({ where: { id } });
  }
}
