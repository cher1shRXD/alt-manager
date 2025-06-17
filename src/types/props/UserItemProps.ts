import { User } from "@/entities/User";

export interface UserItemProps {
  data: User;
  currentUserId?: string;
  adminId?: string;
  workspaceId?: string;
}