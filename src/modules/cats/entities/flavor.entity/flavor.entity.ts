import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "../cat.entity";

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @ManyToMany(
    type => Cat,
    cats => cats.flavors
  )
  cats: Cat[];
}
