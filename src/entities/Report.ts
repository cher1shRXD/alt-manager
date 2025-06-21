import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import type { Workspace } from "./Workspace";
import type { User } from "./User";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  content?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @ManyToOne(() => require("./Workspace").Workspace, (workspace: Workspace) => workspace.reports, { cascade: true })
  workspace?: Workspace;

  @ManyToOne(() => require("./User").User, (user: User) => user.reports, { cascade: true })
  author?: User;
}
