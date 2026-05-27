import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHealthMaterialDto } from '../dto/health.dto';

@Injectable()
export class HealthMaterialService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateHealthMaterialDto) {
    // Verify health and material exist
    const health = await this.prisma.healthBase.findUnique({ where: { id: dto.healthId } });
    const material = await this.prisma.materialBase.findUnique({ where: { id: dto.materialId } });
    
    if (!health) {
      throw new NotFoundException(`Health problem with ID ${dto.healthId} not found`);
    }
    if (!material) {
      throw new NotFoundException(`Material with ID ${dto.materialId} not found`);
    }

    return this.prisma.healthMaterial.create({
      data: {
        healthId: dto.healthId!,
        materialId: dto.materialId,
        matchLogic: dto.matchLogic,
      } as any,
    });
  }

  async findByHealth(healthId: number) {
    return this.prisma.healthMaterial.findMany({
      where: { healthId },
      include: {
        material: {
          select: { id: true, name: true, alias: true, type: true },
        },
      },
    });
  }

  async findByMaterial(materialId: number) {
    return this.prisma.healthMaterial.findMany({
      where: { materialId },
      include: {
        health: {
          select: { id: true, name: true, type: true },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.healthMaterial.delete({ where: { id } });
  }
}
