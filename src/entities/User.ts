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

  @Column()
  name?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @ManyToMany("Workspace", "users")
  workspaces?: Workspace[];

  @OneToMany("Workspace", "admin")
  adminWorkspaces?: Workspace[];

  toJSON() {
    const { password, ...rest } = this;
    return rest;
  }
}
