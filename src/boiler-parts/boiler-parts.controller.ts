import { Controller, Query, UseGuards, Param, Post, Get, Body} from '@nestjs/common';
import { BoilerPartsService } from './boiler-parts.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindOneResponse, GetBestsellersResponse, GetByNameRequest, GetByNameResponse, GetNewResponse, PaginateAndFilterResponse, SearchRequest, SearchResponse } from './types';

@ApiTags('BoilerParts')
@Controller('boiler-parts')
export class BoilerPartsController {
    constructor(private readonly boilerPartsService: BoilerPartsService){}

    @ApiOkResponse({ type: PaginateAndFilterResponse })
    @UseGuards(AuthenticatedGuard) //отдаст ответ только залогиненому пользователю
    @Get()
    paginateAndFilter(@Query() query){
        return this.boilerPartsService.paginateAndFilter(query);
    }

    @ApiOkResponse({ type: FindOneResponse })
    @UseGuards(AuthenticatedGuard) //отдаст ответ только залогиненому пользователю
    @Get('find/:id')
    getOne(@Param('id') id: string){
        return this.boilerPartsService.findOne(id);
    }

    @ApiOkResponse({ type: GetBestsellersResponse })
    @UseGuards(AuthenticatedGuard) //отдаст ответ только залогиненому пользователю
    @Get('bestsellers')
    getBestseller(){
        return this.boilerPartsService.bestsellers();
    }

    @ApiOkResponse({ type: GetNewResponse })
    @UseGuards(AuthenticatedGuard) //отдаст ответ только залогиненому пользователю
    @Get('new')
    getNew(){
        return this.boilerPartsService.new();
    }

    @ApiOkResponse({ type: SearchResponse })
    @ApiBody({type: SearchRequest})
    @UseGuards(AuthenticatedGuard) //отдаст ответ только залогиненому пользователю
    @Post('search')
    search(@Body() {search}: {search: string}){
        return this.boilerPartsService.searchByString(search);
    }

    @ApiOkResponse({ type: GetByNameResponse })
    @ApiBody({type: GetByNameRequest})
    @UseGuards(AuthenticatedGuard) //отдаст ответ только залогиненому пользователю
    @Post('name')
    getByName(@Body() {name}: {name: string}){
        return this.boilerPartsService.findOneByName(name);
    }
}
