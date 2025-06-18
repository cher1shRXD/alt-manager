import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { Task } from "./Task";
import { Report } from "./Report";
import { User } from "./User";

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name?: string;

  @OneToMany("Task", "workspace")
  tasks?: Task[];

  @OneToMany("Report", "workspace")
  reports?: Report[];

  @ManyToMany("User", "workspaces", { cascade: true })
  @JoinTable()
  users?: User[];

  @ManyToOne("User", "adminWorkspaces")
  admin?: User;

  @ManyToMany("User", "mentorWorkspaces", { cascade: true })
  @JoinTable()
  mentors?: User[];
}
