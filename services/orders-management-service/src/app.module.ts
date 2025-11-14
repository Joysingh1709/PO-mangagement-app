import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { OrderService } from './services/orders.service';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig()), TypeOrmModule.forFeature([Order])],
  controllers: [AppController],
  providers: [AppService, OrderService],
})
export class AppModule {}
