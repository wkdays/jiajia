import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { GlobalSearchDto, AdvancedFilterDto } from './dto/search.dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Global search across all entities' })
  globalSearch(@Query() dto: GlobalSearchDto) {
    return this.searchService.globalSearch(dto);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Advanced filter with multi-condition search' })
  advancedFilter(@Query() dto: AdvancedFilterDto) {
    return this.searchService.advancedFilter(dto);
  }

  @Get('aggregations')
  @ApiOperation({ summary: 'Get aggregation statistics' })
  getAggregations() {
    return this.searchService.getAggregations();
  }
}
