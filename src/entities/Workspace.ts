import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import type { Task } from "./Task";
import type { Report } from "./Report";
import type { User } from "./User";

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name?: string;

  @OneToMany(() => require("./Task").Task, (task: Task) => task.workspace)
  tasks?: Task[];

  @OneToMany(() => require("./Report").Report, (report: Report) => report.workspace)
  reports?: Report[];

  @ManyToMany(() => require("./User").User, (user: User) => user.workspaces, { cascade: true })
  @JoinTable()
  users?: User[];

  @ManyToOne(() => require("./User").User, (user: User) => user.adminWorkspaces)
  admin?: User;

  @ManyToMany(() => require("./User").User, (user: User) => user.mentorWorkspaces, { cascade: true })
  @JoinTable()
  mentors?: User[];
}
