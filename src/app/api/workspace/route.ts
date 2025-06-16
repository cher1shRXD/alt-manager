import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/auth";
import { getWorkspaces, createWorkspace, updateWorkspace, deleteWorkspace } from "@/services/workspaceService";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const workspaces = await getWorkspaces(session.user.id);
    return NextResponse.json(workspaces);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const workspace = await createWorkspace(body, session.user.id);
    return NextResponse.json(workspace, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const workspace = await updateWorkspace(body, session.user.id);
    return NextResponse.json(workspace);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    const result = await deleteWorkspace(id, session.user.id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};