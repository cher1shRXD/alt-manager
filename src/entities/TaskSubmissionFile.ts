import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import type { TaskSubmission } from "./TaskSubmission";

@Entity()
export class TaskSubmissionFile {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => require("./TaskSubmission").TaskSubmission, (submission: TaskSubmission) => submission.files, { cascade: true, eager: true })
  submission?: TaskSubmission;

  @Column()
  url?: string;

  @Column({ nullable: true })
  originalName?: string;

  @CreateDateColumn()
  uploadedAt?: Date;
}
