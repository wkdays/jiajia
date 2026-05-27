import { Test, TestingModule } from '@nestjs/testing';
import { MaterialBaseService } from './sub-services/material-base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  materialBase: {
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('MaterialBaseService', () => {
  let service: MaterialBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaterialBaseService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<MaterialBaseService>(MaterialBaseService);
    jest.clearAllMocks();
  });

  it('should create a material', async () => {
    const dto = { name: 'Test Material', type: '维生素' };
    mockPrisma.materialBase.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto as any);
    expect(result.id).toBe(1);
    expect(mockPrisma.materialBase.create).toHaveBeenCalled();
  });

  it('should find all materials with pagination', async () => {
    mockPrisma.materialBase.findMany.mockResolvedValue([{ id: 1, name: 'M1' }]);
    mockPrisma.materialBase.count.mockResolvedValue(1);

    const result = await service.findAll({ page: 1, pageSize: 20 } as any);
    expect(result.items).toHaveLength(1);
    expect(result.pagination.total).toBe(1);
  });

  it('should find one material by id', async () => {
    mockPrisma.materialBase.findUnique.mockResolvedValue({ id: 1, name: 'M1' });

    const result = await service.findOne(1);
    expect(result.id).toBe(1);
  });

  it('should throw NotFoundException for missing material', async () => {
    mockPrisma.materialBase.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
