import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookBaseService } from './sub-services/book-base.service';
import { BookRecordService } from './sub-services/book-record.service';
import { BookRelService } from './sub-services/book-rel.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [
    BookBaseService,
    BookRecordService,
    BookRelService,
  ],
  exports: [BookBaseService],
})
export class BookModule {}
