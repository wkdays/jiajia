import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHealthCauseDto } from '../dto/health.dto';

@Injectable()
export class HealthCauseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateHealthCauseDto) {
    return this.prisma.healthCause.create({ data: dto as any });
  }

  async findByHealth(healthId: number) {
    return this.prisma.healthCause.findMany({
      where: { healthId },
    });
  }

  async remove(id: number) {
    return this.prisma.healthCause.delete({ where: { id } });
  }
}
