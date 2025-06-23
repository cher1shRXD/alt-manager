import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Workspace } from "./Workspace";
import { User } from "./User";

@Entity("report")
export class Report {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'longtext' })
  content?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.reports)
  workspace?: Relation<Workspace>;

  @ManyToOne(() => User, (user) => user.reports)
  author?: Relation<User>;
}
