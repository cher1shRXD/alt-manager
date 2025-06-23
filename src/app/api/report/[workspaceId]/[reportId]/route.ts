import { deleteReport, updateReport } from "@/services/reportService";
import { ReportDTO } from "@/types/dto/ReportDTO";
import { ErrorResponse } from "@/types/ErrorResponse";
import { errorHandler } from "@/utilities/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string, reportId: string }> }) => {
  try{
    const data: ReportDTO = await req.json();
    const { workspaceId, reportId } = await params;

    const report = await updateReport(data, workspaceId, parseInt(reportId));

    return NextResponse.json({ report }, { status: 201 });
  }catch(e){
    return errorHandler((e as ErrorResponse).message);
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string, reportId: string }> }) => {
  try{
    const { workspaceId, reportId } = await params;

    const report = await deleteReport(workspaceId, parseInt(reportId));

    return NextResponse.json({ report }, { status: 201 });
  }catch(e){
    return errorHandler((e as ErrorResponse).message);
  }
}