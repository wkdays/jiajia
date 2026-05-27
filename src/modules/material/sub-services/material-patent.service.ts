import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialPatentDto } from '../dto/material.dto';

@Injectable()
export class MaterialPatentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaterialPatentDto) {
    return this.prisma.materialPatent.create({ data: dto as any });
  }

  async findByMaterial(materialId: number) {
    return this.prisma.materialPatent.findMany({
      where: { materialId },
    });
  }

  async remove(id: number) {
    return this.prisma.materialPatent.delete({ where: { id } });
  }
}
