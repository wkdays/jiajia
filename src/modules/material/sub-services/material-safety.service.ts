import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialSafetyDto } from '../dto/material.dto';

@Injectable()
export class MaterialSafetyService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaterialSafetyDto) {
    return this.prisma.materialSafety.create({ data: dto as any });
  }

  async findByMaterial(materialId: number) {
    return this.prisma.materialSafety.findMany({
      where: { materialId },
    });
  }

  async remove(id: number) {
    return this.prisma.materialSafety.delete({ where: { id } });
  }
}
