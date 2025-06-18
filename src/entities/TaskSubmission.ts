import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from "typeorm";
import { Task } from "./Task";
import { User } from "./User";
import { TaskSubmissionFile } from "./TaskSubmissionFile";

@Entity()
export class TaskSubmission {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne("Task", "submissions", { cascade: true })
  task?: Task;

  @ManyToOne("User", "submissions", { cascade: true })
  user?: User;

  @Column({ default: false })
  isSubmitted?: boolean;

  @OneToMany("TaskSubmissionFile", "submission")
  files?: TaskSubmissionFile[];

  @CreateDateColumn()
  submittedAt?: Date;
}
