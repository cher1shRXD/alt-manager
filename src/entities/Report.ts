import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Workspace } from "./Workspace";
import { User } from "./User";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  content?: string;

  @ManyToOne("Workspace", "reports", { cascade: true })
  workspace?: Workspace;

  @ManyToOne("User", "reports", { cascade: true })
  author?: User;
}
