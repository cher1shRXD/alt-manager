import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinTable } from "typeorm";
import type { Relation } from "typeorm";
import { TaskSubmission } from "./TaskSubmission";

@Entity("task_submission_file")
export class TaskSubmissionFile {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => TaskSubmission, (submission) => submission.files, { cascade: true })
  @JoinTable()
  submission?: Relation<TaskSubmission>;

  @Column()
  url?: string;

  @Column({ nullable: true })
  originalName?: string;

  @CreateDateColumn()
  uploadedAt?: Date;
}
