import {Table, Model, Column } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {

  @Column
  userId: number;

  @Column
  partId: number;

  @Column
  boiler_manufacturer: string; //производитель

  @Column({defaultValue: 0})
  price: number;

  @Column
  parts_manufacturer: string; //регион

  @Column
  name: string;

  @Column
  image: string;

  @Column({defaultValue: 0})
  in_stock: number;  //кол-во товара на складе

  @Column({defaultValue: 0})
  count: number;  

  @Column({defaultValue: 0})
  total_price: number;  

}