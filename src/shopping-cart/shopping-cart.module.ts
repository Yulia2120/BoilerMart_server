import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './shopping-cart.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoilerPartsModule } from 'src/boiler-parts/boiler-parts.module';

@Module({
  imports: [SequelizeModule.forFeature([ShoppingCart]),
  UsersModule,
  BoilerPartsModule
],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule {}
