import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToMany } from "typeorm";
import type { Relation } from "typeorm";
import { Workspace } from "./Workspace";
import { TaskSubmission } from "./TaskSubmission";
import { Report } from "./Report";
import { Task } from "./Task";

@Entity("user")
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

  @ManyToMany(() => Workspace, (workspace) => workspace.users)
  workspaces?: Relation<Workspace[]>;

  @OneToMany(() => Workspace, (workspace) => workspace.admin)
  adminWorkspaces?: Relation<Workspace[]>;

  @ManyToMany(() => Workspace, (workspace) => workspace.mentors)
  mentorWorkspaces?: Relation<Workspace[]>;

  @OneToMany(() => Report, (report) => report.author)
  reports?: Relation<Report[]>;

  @OneToMany(() => Task, (task) => task.mentor)
  mentorTask?: Relation<Task[]>;

  @ManyToMany(() => Task, (task) => task.mentees)
  menteeTask?: Relation<Task[]>;

  @OneToMany(() => TaskSubmission, (taskSubmission) => taskSubmission.user)
  submissions?: Relation<TaskSubmission[]>;
}
