import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import type { Relation } from "typeorm";
import { Task } from "./Task";
import { Report } from "./Report";
import { User } from "./User";

@Entity("workspace")
export class Workspace {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name?: string;

  @OneToMany(() => Task, (task) => task.workspace)
  tasks?: Relation<Task[]>;

  @OneToMany(() => Report, (report) => report.workspace)
  reports?: Relation<Report[]>;

  @ManyToMany(() => User, (user) => user.workspaces, { cascade: true })
  @JoinTable()
  users?: Relation<User[]>;

  @ManyToOne(() => User, (user) => user.adminWorkspaces)
  admin?: Relation<User>;

  @ManyToMany(() => User, (user) => user.mentorWorkspaces, { cascade: true })
  @JoinTable()
  mentors?: Relation<User[]>;
}
