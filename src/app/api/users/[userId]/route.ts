import { getUser } from "@/services/getUser";
import { errorHandler } from "@/utilities/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
  try{
    const { userId } = await params;
    const user = await getUser(userId);

    return NextResponse.json({ user }, { status: 200 });
  }catch(e){
    return errorHandler(e as string);
  }
}