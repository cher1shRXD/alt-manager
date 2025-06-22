import { createReport } from "@/services/reportService";
import { ReportDTO } from "@/types/dto/ReportDTO";
import { ErrorResponse } from "@/types/ErrorResponse";
import { errorHandler } from "@/utilities/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string }> }) => {
  try{
    const data: ReportDTO = await req.json();
    const { workspaceId } = await params;

    const report = await createReport(data, workspaceId);

    return NextResponse.json({ report }, { status: 201 });
  }catch(e){
    return errorHandler((e as ErrorResponse).message);
  }
}