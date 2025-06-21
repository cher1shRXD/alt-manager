import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, OneToMany } from "typeorm";
import type { Workspace } from "./Workspace";
import type { User } from "./User";
import type { TaskSubmission } from "./TaskSubmission";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  description?: string;

  @ManyToOne(() => require("./Workspace").Workspace, (workspace: Workspace) => workspace.tasks, { cascade: true })
  workspace?: Workspace;

  @ManyToOne(() => require("./User").User, (user: User) => user.mentorTask, { cascade: true })
  mentor?: User;

  @ManyToMany(() => require("./User").User, (user: User) => user.menteeTask)
  @JoinTable()
  mentees?: User[];

  @OneToMany(() => require("./TaskSubmission").TaskSubmission, (submission: TaskSubmission) => submission.task)
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
