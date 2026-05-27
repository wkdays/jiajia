import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHealthMechanismDto } from '../dto/health.dto';

@Injectable()
export class HealthMechanismService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateHealthMechanismDto) {
    return this.prisma.healthMechanism.create({ data: dto as any });
  }

  async findByHealth(healthId: number) {
    return this.prisma.healthMechanism.findMany({
      where: { healthId },
    });
  }

  async remove(id: number) {
    return this.prisma.healthMechanism.delete({ where: { id } });
  }
}
