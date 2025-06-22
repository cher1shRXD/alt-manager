import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Workspace } from "./Workspace";
import { User } from "./User";
import { TaskSubmission } from "./TaskSubmission";
import { TaskMentee } from "./TaskMentee";

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  description?: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.tasks)
  workspace?: Relation<Workspace>;

  @ManyToOne(() => User, (user) => user.mentorTask)
  mentor?: Relation<User>;

  @OneToMany(() => TaskMentee, (taskMentee) => taskMentee.task, { cascade: true })
  mentees?: Relation<TaskMentee[]>;

  @OneToMany(() => TaskSubmission, (submission) => submission.task)
  submissions?: Relation<TaskSubmission[]>;

  @Column({ default: false })
  isDone?: boolean;

  @Column()
  startDate?: Date;

  @Column()
  endDate?: Date;

  @CreateDateColumn()
  createdAt?: Date;

}

