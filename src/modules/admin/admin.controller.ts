import { Controller, Get, Put, Post, Query, Param, ParseIntPipe, UseGuards, Body, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import type { Response } from 'express';
import { AdminService } from './admin.service';
import { BackupService } from './backup.service';
import { QueryUserDto, UpdateUserRoleDto } from './dto/admin.dto';
import { RequireRoles } from '../../common/decorators/require-roles.decorator';
import { Role } from '../../common/constants/roles';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
@RequireRoles(Role.ADMIN)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private backupService: BackupService,
  ) {}

  @Get('users')
  @ApiOperation({ summary: 'List all users (admin only)' })
  findAllUsers(@Query() query: QueryUserDto) {
    return this.adminService.findAllUsers(query);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user detail (admin only)' })
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findUserById(id);
  }

  @Put('users/:id/role')
  @ApiOperation({ summary: 'Update user role (admin only)' })
  updateUserRole(@Param('id', ParseIntPipe) id: number, @Query() dto: UpdateUserRoleDto) {
    return this.adminService.updateUserRole(id, dto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get system statistics (admin only)' })
  getSystemStats() {
    return this.adminService.getSystemStats();
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Get audit logs (admin only)' })
  getAuditLogs(@Query() query: { page?: number; pageSize?: number; userId?: number }) {
    return this.adminService.getAuditLogs(query);
  }

  @Get('backup')
  @ApiOperation({ summary: 'Create full system backup (admin only)' })
  async createBackup(@Res() res: Response) {
    const result = await this.backupService.createBackup();
    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.send(result.content);
  }

  @Post('restore')
  @ApiOperation({ summary: 'Preview restore from backup (admin only)' })
  async restoreFromBackup(@Body('backupContent') backupContent: string) {
    return this.backupService.restoreFromBackup(backupContent);
  }
}
