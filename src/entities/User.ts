import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, ManyToMany } from "typeorm";
import type { Workspace } from "./Workspace";
import type { Report } from "./Report";
import type { Task } from "./Task";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ select: false })
  password?: string;

  @Column()
  name?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @ManyToMany(() => require("./Workspace").Workspace, (workspace: Workspace) => workspace.users)
  workspaces?: Workspace[];

  @OneToMany(() => require("./Workspace").Workspace, (workspace: Workspace) => workspace.admin)
  adminWorkspaces?: Workspace[];

  @ManyToMany(() => require("./Workspace").Workspace, (workspace: Workspace) => workspace.mentors)
  mentorWorkspaces?: Workspace[];

  @OneToMany(() => require("./Report").Report, (report: Report) => report.author)
  reports?: Report[];

  @OneToMany(() => require("./Task").Task, (task: Task) => task.mentor)
  mentorTask?: Task[];

  @ManyToMany(() => require("./Task").Task, (task: Task) => task.mentees)
  menteeTask?: Task[];
}
