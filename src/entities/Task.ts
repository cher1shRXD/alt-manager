import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, OneToMany } from "typeorm";
import type { Relation } from "typeorm";
import { Workspace } from "./Workspace";
import { User } from "./User";
import { TaskSubmission } from "./TaskSubmission";

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  description?: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.tasks, { cascade: true })
  workspace?: Relation<Workspace>;

  @ManyToOne(() => User, (user) => user.mentorTask, { cascade: true })
  mentor?: Relation<User>;

  @ManyToMany(() => User, (user) => user.menteeTask)
  @JoinTable()
  mentees?: Relation<User[]>;

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

