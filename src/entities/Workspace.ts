import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { Task } from "./Task";
import { Report } from "./Report";
import { User } from "./User";

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @OneToMany(() => Task, (task) => task.workspace)
  tasks?: Task[];

  @OneToMany(() => Report, (report) => report.workspace)
  reports?: Report[];

  @ManyToMany(() => User, (user) => user.workspace)
  user?: User[];

  @ManyToOne(() => User, (user) => user.adminWorkspaces)
  admin!: User;
}
