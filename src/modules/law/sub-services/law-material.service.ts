import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLawMaterialDto } from '../dto/law.dto';

@Injectable()
export class LawMaterialService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLawMaterialDto) {
    return this.prisma.lawMaterial.create({ data: dto as any });
  }

  async findByLaw(lawId: number) {
    return this.prisma.lawMaterial.findMany({
      where: { lawId },
      include: {
        material: {
          select: { id: true, name: true, alias: true },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.lawMaterial.delete({ where: { id } });
  }
}
