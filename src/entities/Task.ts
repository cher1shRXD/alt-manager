import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, OneToMany } from "typeorm";
import { Workspace } from "./Workspace";
import { User } from "./User";
import { TaskSubmission } from "./TaskSubmission";

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

  @ManyToMany("User", "menteeTask")
  @JoinTable()
  mentees?: User[];

  @OneToMany("TaskSubmission", "task")
  submissions?: TaskSubmission[];

  @Column({ default: false })
  isDone?: boolean;

  @Column()
  startDate?: Date;

  @Column()
  endDate?: Date;

  @CreateDateColumn()
  createdAt?: Date;

}
