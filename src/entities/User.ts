import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToMany } from "typeorm";
import { Workspace } from "./Workspace";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column({ nullable: true })
  name?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @ManyToMany(() => Workspace, (workspace) => workspace.user)
  workspace?: Workspace[];

  @OneToMany(() => Workspace, (workspace) => workspace.admin)
  adminWorkspaces?: Workspace[];
}
