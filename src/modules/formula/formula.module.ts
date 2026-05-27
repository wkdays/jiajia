import { Module } from '@nestjs/common';
import { FormulaController } from './formula.controller';
import { FormulaBaseService } from './sub-services/formula-base.service';
import { FormulaMaterialService } from './sub-services/formula-material.service';
import { FormulaLogicService } from './sub-services/formula-logic.service';
import { FormulaGeneratorService } from './formula-generator.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FormulaController],
  providers: [
    FormulaBaseService,
    FormulaMaterialService,
    FormulaLogicService,
    FormulaGeneratorService,
  ],
  exports: [FormulaBaseService],
})
export class FormulaModule {}
