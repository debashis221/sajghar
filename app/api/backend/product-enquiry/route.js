import db from "@/prisma/db";

export async function GET(req) {
  try {
    const inquiry = await db.productInquiry.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return new Response(JSON.stringify(inquiry), { status: 200 });
  } catch (error) {
    console.error("Error retrieving product inquiry:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
