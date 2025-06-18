import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToMany } from "typeorm";
import { Workspace } from "./Workspace";
import { Report } from "./Report";
import { Task } from "./Task";

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

  @ManyToMany("Workspace", "users")
  workspaces?: Workspace[];

  @OneToMany("Workspace", "admin")
  adminWorkspaces?: Workspace[];

  @ManyToMany("Workspace", "mentors")
  mentorWorkspaces?: Workspace[];

  @OneToMany("Report", "author")
  reports?: Report[];

  @OneToMany("Task", "mentor")
  mentorTask?: Task[];

  @ManyToMany("Task", "memtees")
  menteeTask?: Task[];
}
