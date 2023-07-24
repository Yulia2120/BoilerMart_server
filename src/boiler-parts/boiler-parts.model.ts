import {Table, Model, Column } from 'sequelize-typescript';

@Table
export class BoilerParts extends Model {
  @Column
  boiler_manufacturer: string; //производитель

  @Column({defaultValue: 0})
  price: number;

  @Column
  parts_manufacturer: string; //регион

  @Column
  vendor_code: string; //артикул

  @Column
  name: string;

  @Column
  description: string;

  @Column
  images: string;

  @Column({defaultValue: 0})
  in_stock: number;  //кол-во товара на складе

  @Column({defaultValue: false})
  bestseller: boolean;

  @Column({defaultValue: false})
  new: boolean;  //новинки

  @Column
  popularity: number;

  @Column
  compatibility: string;


}