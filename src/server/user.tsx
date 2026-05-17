"use server";
import { db } from "@/db";
import { user } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const autentikasi = async (_prevState: unknown, formData: FormData) => {
  const username = formData.get("email") as string;
  const password = formData.get("password") as string;

  const [getuser] = await db.select().from(user).where(eq(user.email, username)).limit(1);
  if (getuser === undefined) {
    return { error: "User Tidak ditemukan." };
  }
  const isPasswordValid = await bcrypt.compare(password, getuser.password);
  if (!isPasswordValid) {
    return { error: "Password Salah!" };
  }
  const cookieStore = await cookies();
  cookieStore.set("unlocked", "true", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 jam
  });
  redirect("/manga");
};
