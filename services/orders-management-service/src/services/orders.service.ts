import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  getOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  createOrder(orderData: any): Promise<Order[]> {
    const newOrder = this.orderRepository.create({
        ...orderData
    });
    return this.orderRepository.save(newOrder);
  }
}
