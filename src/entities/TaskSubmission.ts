import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from "typeorm";
import type { TaskSubmissionFile } from "./TaskSubmissionFile";
import { Task } from "./Task";
import { User } from "./User";

@Entity()
export class TaskSubmission {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Task, (task) => task.submissions, { cascade: true })
  task?: Task;

  @ManyToOne(() => User, { cascade: true })
  user?: User;

  @Column({ default: false })
  isSubmitted?: boolean;

  @OneToMany(() => require('./TaskSubmissionFile').TaskSubmissionFile, (file: TaskSubmissionFile) => file.submission)
  files?: TaskSubmissionFile[];

  @CreateDateColumn()
  submittedAt?: Date;
}
