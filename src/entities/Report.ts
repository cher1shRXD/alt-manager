import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Workspace } from "./Workspace";
import { User } from "./User";

@Entity("report")
export class Report {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  content?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.reports , { cascade: true })
  workspace?: Relation<Workspace>;

  @ManyToOne(() => User, (user) => user.reports, { cascade: true })
  author?: Relation<User>;
}
