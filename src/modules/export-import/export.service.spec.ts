import { Test, TestingModule } from '@nestjs/testing';
import { ExportService } from './export.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrisma = {
  materialBase: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
  formulaBase: {
    findUnique: jest.fn(),
  },
};

describe('ExportService', () => {
  let service: ExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExportService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ExportService>(ExportService);
    jest.clearAllMocks();
  });

  it('should export materials to CSV', async () => {
    mockPrisma.materialBase.findMany.mockResolvedValue([
      { id: 1, name: 'Vitamin C', alias: 'VC', type: '维生素', intro: '抗氧化', source: null },
    ]);
    mockPrisma.materialBase.count.mockResolvedValue(1);

    const result = await service.exportToCsv('material');

    expect(result.filename).toContain('material-export');
    expect(result.content).toContain('id,name,alias,type,intro,source');
    expect(result.content).toContain('Vitamin C');
    expect(result.contentType).toBe('text/csv; charset=utf-8');
  });

  it('should export formula report as HTML', async () => {
    const mockFormula = {
      id: 1,
      name: 'Test Formula',
      targetPeople: '成人',
      targetCountry: '中国',
      createUser: 'admin',
      health: { id: 1, name: '失眠症', type: '睡眠' },
      materials: [
        { material: { name: '褪黑素', type: '激素' }, dosage: 3, dosageLogic: '睡前服用' },
      ],
      logics: [
        { logicLine: '失眠 → GABA → 褪黑素', effectSummary: '改善睡眠', complianceConclusion: '合规', tips: '避免白天服用' },
      ],
    };

    mockPrisma.formulaBase.findUnique.mockResolvedValue(mockFormula);

    const result = await service.exportFormulaReport(1);

    expect(result.filename).toContain('formula-report-1');
    expect(result.content).toContain('配方报告: Test Formula');
    expect(result.content).toContain('褪黑素');
    expect(result.contentType).toBe('text/html; charset=utf-8');
  });
});
