import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialBaseService } from './sub-services/material-base.service';
import { MaterialSupplierService } from './sub-services/material-supplier.service';
import { MaterialEffectService } from './sub-services/material-effect.service';
import { MaterialClinicService } from './sub-services/material-clinic.service';
import { MaterialPatentService } from './sub-services/material-patent.service';
import { MaterialSafetyService } from './sub-services/material-safety.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MaterialController],
  providers: [
    MaterialBaseService,
    MaterialSupplierService,
    MaterialEffectService,
    MaterialClinicService,
    MaterialPatentService,
    MaterialSafetyService,
  ],
  exports: [MaterialBaseService],
})
export class MaterialModule {}
