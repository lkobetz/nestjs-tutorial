import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { Flavor } from './flavor.entity'

@Entity()
// typeorm will name the sql table based on the class name in lowercase (ie 'coffee'). Passing a string argument to the Entity decorator will rename it as that string
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0})
  recommendations: number;

  // JoinTable specifies the Coffee entity as the owner side of the relationship
  @JoinTable()
  // many to many because each coffee can have multiple flavors and each flavor can have multiple coffees
  // type is a function that returns a reference to the related entity
  @ManyToMany(type => Flavor, flavor => flavor.coffees,
    {
      // cascade updates Flavor table when new coffee is added that includes a flavor not yet in the Flavors table
      cascade: true
    })
  flavors: Flavor[];
}
