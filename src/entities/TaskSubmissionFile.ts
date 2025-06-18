import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { TaskSubmission } from "./TaskSubmission";

@Entity()
export class TaskSubmissionFile {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne("TaskSubmission", "files", { cascade: true })
  submission?: TaskSubmission;

  @Column()
  url?: string;

  @Column({ nullable: true })
  originalName?: string;

  @CreateDateColumn()
  uploadedAt?: Date;
}
