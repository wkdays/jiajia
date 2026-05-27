import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFormulaLogicDto } from '../dto/formula.dto';

@Injectable()
export class FormulaLogicService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFormulaLogicDto) {
    return this.prisma.formulaLogic.create({ data: dto as any });
  }

  async findByFormula(formulaId: number) {
    return this.prisma.formulaLogic.findMany({
      where: { formulaId },
    });
  }

  async remove(id: number) {
    return this.prisma.formulaLogic.delete({ where: { id } });
  }
}
