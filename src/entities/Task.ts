import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Workspace } from "./Workspace";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  description?: string;

  @ManyToOne("Workspace", "tasks", { cascade: true })
  workspace?: Workspace;

  @ManyToOne("User", "mentorTask", { cascade: true })
  mentor?: User;

  @ManyToMany("User", "menteeTask", { cascade: true })
  @JoinTable()
  mentees?: User[];

}
