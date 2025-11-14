import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderService } from './services/orders.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private orderService: OrderService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('orders')
  getOrders() {
    return this.orderService.getOrders();
  }

  @Post('orders')
  createOrder(@Body() order: any) {
    console.log('Creating order with data:', order);
    return this.orderService.createOrder(order);
  }
}
