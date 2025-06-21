import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from "typeorm";
import type { Relation } from "typeorm";
import { Task } from "./Task";
import { User } from "./User";
import { TaskSubmissionFile } from "./TaskSubmissionFile";

@Entity("task_submission")
export class TaskSubmission {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Task, (task) => task.submissions, { cascade: true })
  task?: Relation<Task>;

  @ManyToOne(() => User, (user) => user.submissions, { cascade: true })
  user?: Relation<User>;

  @Column({ default: false })
  isSubmitted?: boolean;

  @OneToMany(() => TaskSubmissionFile, (file) => file.submission)
  files?: Relation<TaskSubmissionFile[]>;

  @CreateDateColumn()
  submittedAt?: Date;
}

