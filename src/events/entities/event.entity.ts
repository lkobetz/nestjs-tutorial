// this file was generated with command: nest g class events/entities/event.entity --no-spec
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'

// indexing improves lookup speed, can be applied to the whole class or certain properties
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // @Index decorator is optional, for speeding up performance
  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>
}
