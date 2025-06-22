import { cancelSubmit } from "@/services/taskService";
import { ErrorResponse } from "@/types/ErrorResponse";
import { errorHandler } from "@/utilities/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ submissionId: string }> }) => {
  try{
    const { submissionId } = await params;

    const taskSubmission = await cancelSubmit(parseInt(submissionId));

    return NextResponse.json({ taskSubmission }, { status: 201 });
  }catch(e){
    console.log(e);
    return errorHandler((e as ErrorResponse).message);
  }
}