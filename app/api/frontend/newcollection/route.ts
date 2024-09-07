import db from "@/prisma/db";

export async function GET(req) {
  try {
    const NewCollection = await db.newCollection.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return new Response(JSON.stringify(NewCollection), { status: 200 });
  } catch (error) {
    console.error("Error retrieving product categories:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
