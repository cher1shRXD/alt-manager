import { forbidden, notfound, unauthorized } from "@/constants/errorEnum";
import { NextResponse } from "next/server";

export const errorHandler = (e: string) => {
  if(e === unauthorized) {
    return NextResponse.json({ message: unauthorized }, { status: 401 });
  }else if (e === notfound) {
    return NextResponse.json({ message: notfound }, { status: 404 });
  }else if (e === forbidden) {
    return NextResponse.json({ message: forbidden }, { status: 403 });
  }

  return NextResponse.json({ message: "server error" }, { status: 500 });
}