import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MaterialModule } from './modules/material/material.module';
import { HealthModule } from './modules/health/health.module';
import { LawModule } from './modules/law/law.module';
import { FormulaModule } from './modules/formula/formula.module';
import { BookModule } from './modules/book/book.module';
import { SearchModule } from './modules/search/search.module';
import { ExportImportModule } from './modules/export-import/export-import.module';
import { AdminModule } from './modules/admin/admin.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: async () => ({
        secret: process.env.JWT_SECRET || 'jiajia_jwt_secret_key_change_in_production',
        signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as `${number}d` },
      }),
    }),
    PrismaModule,
    AuthModule,
    MaterialModule,
    HealthModule,
    LawModule,
    FormulaModule,
    BookModule,
    SearchModule,
    ExportImportModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
