import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Workspace } from "./Workspace";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  content?: string;

  @ManyToOne("Workspace", "reports", { cascade: true })
  workspace?: Workspace;
}
