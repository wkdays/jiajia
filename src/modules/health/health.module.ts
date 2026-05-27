import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthBaseService } from './sub-services/health-base.service';
import { HealthMechanismService } from './sub-services/health-mechanism.service';
import { HealthCauseService } from './sub-services/health-cause.service';
import { HealthMaterialService } from './sub-services/health-material.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HealthController],
  providers: [
    HealthBaseService,
    HealthMechanismService,
    HealthCauseService,
    HealthMaterialService,
  ],
  exports: [HealthBaseService, HealthMaterialService],
})
export class HealthModule {}
