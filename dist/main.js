"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const prisma_exception_filter_1 = require("./common/filters/prisma-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const audit_log_interceptor_1 = require("./common/interceptors/audit-log.interceptor");
const prisma_service_1 = require("./prisma/prisma.service");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    const configService = app.get(config_1.ConfigService);
    const apiPrefix = configService.get('API_PREFIX', '/api/v1');
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(), new logging_interceptor_1.LoggingInterceptor(), new audit_log_interceptor_1.AuditLogInterceptor(prisma));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(), new prisma_exception_filter_1.PrismaExceptionFilter());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('JiaJia Dietary Supplement R&D API')
        .setDescription('Professional dietary supplement research and development database system API')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = configService.get('PORT', 3000);
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}${apiPrefix}`);
    console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map