import { Test, TestingModule } from '@nestjs/testing';
import { FormulaGeneratorService } from './formula-generator.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  healthBase: {
    findUnique: jest.fn(),
  },
  formulaBase: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  formulaMaterial: {
    create: jest.fn(),
  },
  formulaLogic: {
    create: jest.fn(),
  },
  lawMaterial: {
    findMany: jest.fn(),
  },
};

describe('FormulaGeneratorService', () => {
  let service: FormulaGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormulaGeneratorService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<FormulaGeneratorService>(FormulaGeneratorService);
    jest.clearAllMocks();
  });

  it('should throw NotFoundException if health problem does not exist', async () => {
    mockPrisma.healthBase.findUnique.mockResolvedValue(null);

    await expect(
      service.generate({ healthId: 999 } as any),
    ).rejects.toThrow(NotFoundException);
  });

  it('should generate a formula successfully', async () => {
    const healthProblem = {
      id: 1,
      name: '失眠症',
      mechanisms: [{ coreTarget: 'GABA受体' }],
      causes: [],
      materialLinks: [
        {
          material: {
            id: 1,
            name: '褪黑素',
            effects: [{ functionalComponent: '褪黑素' }],
            safety: [{ dailyMax: 10 }],
          },
          matchLogic: '调节睡眠周期',
        },
      ],
    };

    mockPrisma.healthBase.findUnique.mockResolvedValue(healthProblem);
    mockPrisma.formulaBase.create.mockResolvedValue({ id: 1, name: '失眠症 - 通用配方', healthId: 1 });
    mockPrisma.formulaMaterial.create.mockResolvedValue({ id: 1 });
    mockPrisma.formulaLogic.create.mockResolvedValue({ id: 1 });
    mockPrisma.formulaBase.findUnique.mockResolvedValue({
      id: 1,
      name: '失眠症 - 通用配方',
      health: healthProblem,
      materials: [],
      logics: [],
    });

    const result = await service.generate({
      healthId: 1,
      targetPeople: '通用',
    } as any);

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(mockPrisma.formulaBase.create).toHaveBeenCalled();
    expect(mockPrisma.formulaMaterial.create).toHaveBeenCalled();
    expect(mockPrisma.formulaLogic.create).toHaveBeenCalled();
  });
});
