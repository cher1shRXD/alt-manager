import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Task } from "./Task";
import { User } from "./User";

@Entity("task_mentee")
export class TaskMentee {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Task, { onDelete: "CASCADE" })
  task?: Relation<Task>;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  mentee?: Relation<User>;

  @CreateDateColumn()
  assignedAt?: Date;
}
