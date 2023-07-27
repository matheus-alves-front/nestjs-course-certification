import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity/flavor.entity";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  brand: string;
  
  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany(
    type => Flavor, 
    (flavor) => flavor.cats,
    {
      cascade: true, // ['insert']
    }
  )
  flavors: Flavor[];
}
