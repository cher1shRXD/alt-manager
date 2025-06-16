import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Workspace } from "./Workspace";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  description?: string;

  @ManyToOne("Workspace", "tasks", { cascade: true })
  workspace?: Workspace;
}
