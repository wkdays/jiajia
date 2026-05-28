import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialBaseDto, UpdateMaterialBaseDto, QueryMaterialDto } from '../dto/material.dto';

@Injectable()
export class MaterialBaseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaterialBaseDto) {
    return this.prisma.materialBase.create({
      data: {
        name: dto.name,
        alias: dto.alias,
        type: dto.type,
        intro: dto.intro,
        source: dto.source,
      },
    });
  }

  async findAll(query: QueryMaterialDto) {
    const { page = 1, pageSize = 20, search, type } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { alias: { contains: search } },
      ];
    }
    if (type) {
      where.type = type;
    }

    const [items, total] = await Promise.all([
      this.prisma.materialBase.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
        include: {
          suppliers: true,
          effects: true,
          safety: true,
        },
      }),
      this.prisma.materialBase.count({ where }),
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
    const material = await this.prisma.materialBase.findUnique({
      where: { id },
      include: {
        suppliers: true,
        effects: true,
        clinics: true,
        patents: true,
        safety: true,
        healthLinks: {
          include: {
            health: true,
          },
        },
      },
    });

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }

    return material;
  }

  async update(id: number, dto: UpdateMaterialBaseDto) {
    await this.findOne(id);
    return this.prisma.materialBase.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    const deleted = await this.prisma.materialBase.delete({ where: { id } });
    await this.renumberIds();
    return deleted;
  }

  async removeBatch(ids: number[]) {
    if (!ids || ids.length === 0) {
      return { deleted: 0 };
    }
    const result = await this.prisma.materialBase.deleteMany({
      where: { id: { in: ids } },
    });
    await this.renumberIds();
    return { deleted: result.count };
  }

  private async renumberIds() {
    const records = await this.prisma.materialBase.findMany({
      orderBy: { id: 'asc' },
      select: { id: true },
    });

    for (let i = 0; i < records.length; i++) {
      const oldId = records[i].id;
      const newId = i + 1;
      if (oldId === newId) continue;

      await this.prisma.$executeRaw`UPDATE MaterialSupplier SET materialId = ${newId} WHERE materialId = ${oldId}`;
      await this.prisma.$executeRaw`UPDATE MaterialEffect SET materialId = ${newId} WHERE materialId = ${oldId}`;
      await this.prisma.$executeRaw`UPDATE MaterialClinic SET materialId = ${newId} WHERE materialId = ${oldId}`;
      await this.prisma.$executeRaw`UPDATE MaterialPatent SET materialId = ${newId} WHERE materialId = ${oldId}`;
      await this.prisma.$executeRaw`UPDATE MaterialSafety SET materialId = ${newId} WHERE materialId = ${oldId}`;
      await this.prisma.$executeRaw`UPDATE HealthMaterial SET materialId = ${newId} WHERE materialId = ${oldId}`;
      await this.prisma.$executeRaw`UPDATE LawMaterial SET materialId = ${newId} WHERE materialId = ${oldId}`;
      await this.prisma.$executeRaw`UPDATE FormulaMaterial SET materialId = ${newId} WHERE materialId = ${oldId}`;
      await this.prisma.$executeRaw`UPDATE MaterialBase SET id = ${newId} WHERE id = ${oldId}`;
    }

    if (records.length > 0) {
      await this.prisma.$executeRaw`UPDATE sqlite_sequence SET seq = ${records.length} WHERE name = 'MaterialBase'`;
    } else {
      await this.prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'MaterialBase'`;
    }
  }
}
