import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFormulaBaseDto, UpdateFormulaBaseDto, QueryFormulaDto } from '../dto/formula.dto';

@Injectable()
export class FormulaBaseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFormulaBaseDto) {
    return this.prisma.formulaBase.create({
      data: dto,
      include: {
        health: {
          select: { id: true, name: true },
        },
      },
    });
  }

  async findAll(query: QueryFormulaDto) {
    const { page = 1, pageSize = 20, name, healthId } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (name) {
      where.name = { contains: name };
    }
    if (healthId) {
      where.healthId = healthId;
    }

    const [items, total] = await Promise.all([
      this.prisma.formulaBase.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
        include: {
          health: {
            select: { id: true, name: true },
          },
          materials: {
            include: {
              material: {
                select: { id: true, name: true },
              },
            },
          },
        },
      }),
      this.prisma.formulaBase.count({ where }),
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
    const formula = await this.prisma.formulaBase.findUnique({
      where: { id },
      include: {
        health: true,
        materials: {
          include: {
            material: true,
          },
        },
        logics: true,
      },
    });

    if (!formula) {
      throw new NotFoundException(`Formula with ID ${id} not found`);
    }

    return formula;
  }

  async update(id: number, dto: UpdateFormulaBaseDto) {
    await this.findOne(id);
    return this.prisma.formulaBase.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.formulaBase.delete({ where: { id } });
  }
}
