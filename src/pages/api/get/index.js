import { PrismaClient } from "@prisma/client";
import handleNotAuthenticated from "@/utils/handleNotAuthenticated";
import isAuthenticated from "@/utils/isAuthenticated";
const prisma = new PrismaClient();

export default async function get(req, res) {
  if (!isAuthenticated(req)) handleNotAuthenticated(res);

  if (req.method === "GET") {
    try {
      let list = await prisma.newItem.findMany();
      return res.status(200).json({ list });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
