import { hash } from "bcrypt";
import db from "@/prisma/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { name, email, password } = await req.json();
    console.log("Received data:", { name, email, password });

    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists");
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);
    console.log("Password hashed");

    // Create the new user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log("User created:", user);

    // Return success response
    return new Response(JSON.stringify({ message: "User created" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
