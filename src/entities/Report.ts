import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Workspace } from "./Workspace";
import { User } from "./User";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  content?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @ManyToOne("Workspace", "reports", { cascade: true })
  workspace?: Workspace;

  @ManyToOne("User", "reports", { cascade: true })
  author?: User;
}
