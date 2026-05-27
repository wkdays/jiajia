import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialClinicDto } from '../dto/material.dto';

@Injectable()
export class MaterialClinicService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaterialClinicDto) {
    return this.prisma.materialClinic.create({ data: dto as any });
  }

  async findByMaterial(materialId: number) {
    return this.prisma.materialClinic.findMany({
      where: { materialId },
    });
  }

  async remove(id: number) {
    return this.prisma.materialClinic.delete({ where: { id } });
  }
}
