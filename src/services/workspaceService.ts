import { Workspace } from "@/entities/Workspace";
import { initializeDataSource } from "@/libs/typeorm/initialize";

export const getWorkspaces = async (userId: string) => {
  const db = await initializeDataSource();
  const workspaceRepo = db.getRepository(Workspace);
  const workspaces = await workspaceRepo.find({
    where: { user: { id: userId } },
    relations: ["admin", "tasks", "reports"],
  });
  return workspaces;
};

export const createWorkspace = async (body: any, userId: string) => {
  const db = await initializeDataSource();
  const workspaceRepo = db.getRepository(Workspace);

  if (body.adminId !== userId) {
    throw new Error("Only admins can create workspaces.");
  }

  const newWorkspace = workspaceRepo.create(body);
  const savedWorkspace = await workspaceRepo.save(newWorkspace);
  return savedWorkspace;
};

export const updateWorkspace = async (body: any, userId: string) => {
  const db = await initializeDataSource();
  const workspaceRepo = db.getRepository(Workspace);

  const workspace = await workspaceRepo.findOne({
    where: { id: body.id },
    relations: ["admin"],
  });

  if (!workspace) {
    throw new Error("Workspace not found.");
  }

  if (workspace.admin.id !== userId) {
    throw new Error("Only admins can update this workspace.");
  }

  workspaceRepo.merge(workspace, body);
  const updatedWorkspace = await workspaceRepo.save(workspace);
  return updatedWorkspace;
};

export const deleteWorkspace = async (id: number, userId: string) => {
  const db = await initializeDataSource();
  const workspaceRepo = db.getRepository(Workspace);

  const workspace = await workspaceRepo.findOne({
    where: { id },
    relations: ["admin"],
  });

  if (!workspace) {
    throw new Error("Workspace not found.");
  }

  if (workspace.admin.id !== userId) {
    throw new Error("Only admins can delete this workspace.");
  }

  await workspaceRepo.remove(workspace);
  return { message: "Workspace deleted successfully" };
};
