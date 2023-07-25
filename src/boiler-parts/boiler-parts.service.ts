import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BoilerParts } from './boiler-parts.model';
import { IBoilerPartsFilter, IBoilerPartsQuery } from './types';
import { Op } from 'sequelize';

@Injectable()
export class BoilerPartsService {
    constructor(
        @InjectModel(BoilerParts)
        private boilerPartsModel: typeof BoilerParts,
    ){}
//пагинация и фильтр страниц
    async paginateAndFilter(query: IBoilerPartsQuery): Promise<{count: number; rows: BoilerParts[]}>{
        const limit = +query.limit;
        const offset = +query.offset * 20;
        const filter = {} as Partial<IBoilerPartsFilter>
        if(query.priceFrom && query.priceTo){
            filter.price = {
                [Op.between]: [+query.priceFrom, +query.priceTo]
            }
        }
        if(query.boiler){
            filter.boiler_manufacturer = JSON.parse(decodeURIComponent(query.boiler))
                
        }
        if(query.parts){
            filter.parts_manufacturer = JSON.parse(decodeURIComponent(query.parts))
                
        }

        return this.boilerPartsModel.findAndCountAll({
            limit,
            offset,
            where: filter
        });
    }
//поиск бестселлеров
    async bestsellers(): Promise<{count: number; rows: BoilerParts[]}>{
        return this.boilerPartsModel.findAndCountAll({
            where: {bestseller: true}
        });
    }
//поиск новинок
    async new(): Promise<{count: number; rows: BoilerParts[]}>{
        return this.boilerPartsModel.findAndCountAll({
            where: {new: true}
        });
    }
// поиск по id
    async findOne(id: number | string): Promise<BoilerParts>{
        return this.boilerPartsModel.findOne({
            where: {id}
        });
    }

    // поиск по названию
    async findOneByName(name: string): Promise<BoilerParts>{
        return this.boilerPartsModel.findOne({
            where: {name}
        });
    }
 
    // поиск по введенной строке
    async searchByString(str: string): Promise<{count: number; rows: BoilerParts[]}>{
        return this.boilerPartsModel.findAndCountAll({
            limit: 20,
            where: {name: {[Op.like]: `%${str}%`}}
        });
    }


    }

