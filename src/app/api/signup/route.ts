import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/entities/User";
import { initializeDataSource } from "@/libs/typeorm/initialize";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  console.log(email, password, name);

  const db = await initializeDataSource();
  console.log("이니셜라이즈 실행됨");
  const userRepo = db.getRepository(User);

  const existing = await userRepo.findOneBy({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = userRepo.create({ email, password: hashedPassword, name });
  await userRepo.save(newUser);

  return NextResponse.json({ message: "User registered" });
}
