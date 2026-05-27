import { Module } from '@nestjs/common';
import { LawController } from './law.controller';
import { LawBaseService } from './sub-services/law-base.service';
import { LawMaterialService } from './sub-services/law-material.service';
import { LawUpdateService } from './sub-services/law-update.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LawController],
  providers: [
    LawBaseService,
    LawMaterialService,
    LawUpdateService,
  ],
  exports: [LawBaseService],
})
export class LawModule {}
