import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFormulaMaterialDto } from '../dto/formula.dto';

@Injectable()
export class FormulaMaterialService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFormulaMaterialDto) {
    return this.prisma.formulaMaterial.create({ data: dto as any });
  }

  async findByFormula(formulaId: number) {
    return this.prisma.formulaMaterial.findMany({
      where: { formulaId },
      include: {
        material: {
          select: { id: true, name: true, alias: true },
        },
      },
    });
  }

  async updateDosage(id: number, dosage: number, dosageLogic?: string) {
    return this.prisma.formulaMaterial.update({
      where: { id },
      data: { dosage, dosageLogic },
    });
  }

  async remove(id: number) {
    return this.prisma.formulaMaterial.delete({ where: { id } });
  }
}
