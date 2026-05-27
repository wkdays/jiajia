import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLawUpdateDto } from '../dto/law.dto';

@Injectable()
export class LawUpdateService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLawUpdateDto) {
    return this.prisma.lawUpdate.create({
      data: {
        lawId: dto.lawId!,
        updateDate: dto.updateDate ? new Date(dto.updateDate) : undefined,
        updateContent: dto.updateContent,
      } as any,
    });
  }

  async findByLaw(lawId: number) {
    return this.prisma.lawUpdate.findMany({
      where: { lawId },
      orderBy: { updateDate: 'desc' },
    });
  }

  async remove(id: number) {
    return this.prisma.lawUpdate.delete({ where: { id } });
  }
}
