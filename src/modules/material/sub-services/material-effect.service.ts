import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialEffectDto } from '../dto/material.dto';

@Injectable()
export class MaterialEffectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaterialEffectDto) {
    return this.prisma.materialEffect.create({ data: dto as any });
  }

  async findByMaterial(materialId: number) {
    return this.prisma.materialEffect.findMany({
      where: { materialId },
    });
  }

  async remove(id: number) {
    return this.prisma.materialEffect.delete({ where: { id } });
  }
}
