import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryUserDto, UpdateUserRoleDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(query: QueryUserDto) {
    const { page = 1, pageSize = 20, search, role } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { username: { contains: search } },
      ];
    }
    if (role) {
      where.role = role;
    }

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUserRole(id: number, dto: UpdateUserRoleDto) {
    await this.findUserById(id);
    return this.prisma.user.update({
      where: { id },
      data: { role: dto.role },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  async getSystemStats() {
    const [
      userCount,
      materialCount,
      healthCount,
      formulaCount,
      lawCount,
      bookCount,
      auditLogCount,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.materialBase.count(),
      this.prisma.healthBase.count(),
      this.prisma.formulaBase.count(),
      this.prisma.lawBase.count(),
      this.prisma.bookBase.count(),
      this.prisma.auditLog.count(),
    ]);

    return {
      users: userCount,
      materials: materialCount,
      healthProblems: healthCount,
      formulas: formulaCount,
      laws: lawCount,
      books: bookCount,
      auditLogs: auditLogCount,
    };
  }

  async getAuditLogs(query: { page?: number; pageSize?: number; userId?: number }) {
    const { page = 1, pageSize = 20, userId } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (userId) where.userId = userId;

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }
}
