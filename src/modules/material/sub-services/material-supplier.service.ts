import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialSupplierDto } from '../dto/material.dto';

@Injectable()
export class MaterialSupplierService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaterialSupplierDto) {
    return this.prisma.materialSupplier.create({ data: dto as any });
  }

  async findByMaterial(materialId: number) {
    return this.prisma.materialSupplier.findMany({
      where: { materialId },
    });
  }

  async remove(id: number) {
    return this.prisma.materialSupplier.delete({ where: { id } });
  }
}
