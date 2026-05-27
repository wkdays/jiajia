import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GlobalSearchDto, AdvancedFilterDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async globalSearch(dto: GlobalSearchDto) {
    const { query, entities = ['material', 'health', 'formula', 'law', 'book'], page = 1, pageSize = 20 } = dto;
    const skip = (page - 1) * pageSize;
    const results: any = {};
    let totalCount = 0;

    if (entities.includes('material')) {
      const [items, count] = await Promise.all([
        this.prisma.materialBase.findMany({
          where: {
            OR: [
              { name: { contains: query } },
              { alias: { contains: query } },
              { type: { contains: query } },
              { intro: { contains: query } },
              { source: { contains: query } },
            ],
          },
          skip,
          take: pageSize,
          orderBy: { id: 'desc' },
        }),
        this.prisma.materialBase.count({
          where: {
            OR: [
              { name: { contains: query } },
              { alias: { contains: query } },
              { type: { contains: query } },
              { intro: { contains: query } },
              { source: { contains: query } },
            ],
          },
        }),
      ]);
      results.materials = { items, count };
      totalCount += count;
    }

    if (entities.includes('health')) {
      const [items, count] = await Promise.all([
        this.prisma.healthBase.findMany({
          where: {
            OR: [
              { name: { contains: query } },
              { symptom: { contains: query } },
            ],
          },
          skip,
          take: pageSize,
          orderBy: { id: 'desc' },
        }),
        this.prisma.healthBase.count({
          where: {
            OR: [
              { name: { contains: query } },
              { symptom: { contains: query } },
            ],
          },
        }),
      ]);
      results.healthProblems = { items, count };
      totalCount += count;
    }

    if (entities.includes('formula')) {
      const [items, count] = await Promise.all([
        this.prisma.formulaBase.findMany({
          where: {
            OR: [
              { name: { contains: query } },
              { targetPeople: { contains: query } },
              { targetCountry: { contains: query } },
            ],
          },
          skip,
          take: pageSize,
          orderBy: { id: 'desc' },
          include: {
            health: { select: { id: true, name: true } },
          },
        }),
        this.prisma.formulaBase.count({
          where: {
            OR: [
              { name: { contains: query } },
              { targetPeople: { contains: query } },
              { targetCountry: { contains: query } },
            ],
          },
        }),
      ]);
      results.formulas = { items, count };
      totalCount += count;
    }

    if (entities.includes('law')) {
      const [items, count] = await Promise.all([
        this.prisma.lawBase.findMany({
          where: {
            OR: [
              { name: { contains: query } },
              { country: { contains: query } },
              { scope: { contains: query } },
            ],
          },
          skip,
          take: pageSize,
          orderBy: { id: 'desc' },
        }),
        this.prisma.lawBase.count({
          where: {
            OR: [
              { name: { contains: query } },
              { country: { contains: query } },
              { scope: { contains: query } },
            ],
          },
        }),
      ]);
      results.laws = { items, count };
      totalCount += count;
    }

    if (entities.includes('book')) {
      const [items, count] = await Promise.all([
        this.prisma.bookBase.findMany({
          where: {
            OR: [
              { name: { contains: query } },
              { author: { contains: query } },
              { publisher: { contains: query } },
            ],
          },
          skip,
          take: pageSize,
          orderBy: { id: 'desc' },
        }),
        this.prisma.bookBase.count({
          where: {
            OR: [
              { name: { contains: query } },
              { author: { contains: query } },
              { publisher: { contains: query } },
            ],
          },
        }),
      ]);
      results.books = { items, count };
      totalCount += count;
    }

    return {
      query,
      entities,
      totalCount,
      results,
      pagination: {
        page,
        pageSize,
      },
    };
  }

  async advancedFilter(dto: AdvancedFilterDto) {
    const { entity = 'material', page = 1, pageSize = 20 } = dto;
    const skip = (page - 1) * pageSize;

    switch (entity) {
      case 'material':
        return this.filterMaterials(dto, skip, pageSize);
      case 'health':
        return this.filterHealthProblems(dto, skip, pageSize);
      case 'formula':
        return this.filterFormulas(dto, skip, pageSize);
      case 'law':
        return this.filterLaws(dto, skip, pageSize);
      default:
        return this.filterMaterials(dto, skip, pageSize);
    }
  }

  private async filterMaterials(dto: AdvancedFilterDto, skip: number, pageSize: number) {
    const where: any = {};
    if (dto.name) where.name = { contains: dto.name };
    if (dto.category) where.type = dto.category;

    const [items, total] = await Promise.all([
      this.prisma.materialBase.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.materialBase.count({ where }),
    ]);

    return { entity: 'material', items, pagination: { page: dto.page, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
  }

  private async filterHealthProblems(dto: AdvancedFilterDto, skip: number, pageSize: number) {
    const where: any = {};
    if (dto.name) where.name = { contains: dto.name };
    if (dto.category) where.type = dto.category;

    const [items, total] = await Promise.all([
      this.prisma.healthBase.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.healthBase.count({ where }),
    ]);

    return { entity: 'health', items, pagination: { page: dto.page, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
  }

  private async filterFormulas(dto: AdvancedFilterDto, skip: number, pageSize: number) {
    const where: any = {};
    if (dto.name) where.name = { contains: dto.name };
    if (dto.healthId) where.healthId = dto.healthId;
    if (dto.country) where.targetCountry = dto.country;
    if (dto.status) where.status = dto.status;

    const [items, total] = await Promise.all([
      this.prisma.formulaBase.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
        include: {
          health: { select: { id: true, name: true } },
        },
      }),
      this.prisma.formulaBase.count({ where }),
    ]);

    return { entity: 'formula', items, pagination: { page: dto.page, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
  }

  private async filterLaws(dto: AdvancedFilterDto, skip: number, pageSize: number) {
    const where: any = {};
    if (dto.name) where.name = { contains: dto.name };
    if (dto.country) where.country = dto.country;

    const [items, total] = await Promise.all([
      this.prisma.lawBase.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.lawBase.count({ where }),
    ]);

    return { entity: 'law', items, pagination: { page: dto.page, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
  }

  async getAggregations() {
    const [
      materialCount,
      healthCount,
      formulaCount,
      lawCount,
      bookCount,
      materialByCategory,
      formulaByCountry,
      lawByCountry,
    ] = await Promise.all([
      this.prisma.materialBase.count(),
      this.prisma.healthBase.count(),
      this.prisma.formulaBase.count(),
      this.prisma.lawBase.count(),
      this.prisma.bookBase.count(),
      this.prisma.materialBase.groupBy({
        by: ['type'],
        _count: { id: true },
      }),
      this.prisma.formulaBase.groupBy({
        by: ['targetCountry'],
        _count: { id: true },
      }),
      this.prisma.lawBase.groupBy({
        by: ['country'],
        _count: { id: true },
      }),
    ]);

    return {
      counts: {
        materials: materialCount,
        healthProblems: healthCount,
        formulas: formulaCount,
        laws: lawCount,
        books: bookCount,
      },
      materialByCategory: materialByCategory.map((item: any) => ({
          type: item.type,
          count: item._count.id,
        })),
      formulaByCountry: formulaByCountry.map((item: any) => ({
          country: item.targetCountry || '未指定',
          count: item._count.id,
        })),
      lawByCountry: lawByCountry.map((item: any) => ({
          country: item.country,
          count: item._count.id,
        })),
    };
  }
}
