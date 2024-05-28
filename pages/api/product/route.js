import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("eventhub");

    switch (req.method) {
      case "POST":
        const data = req.body;
        console.log(data);
        // Ensure name and email are provided
        if (!data) {
          res.status(400).json({ message: "Name and email are required" });
          return;
        }

        // Add user to the database
        const result = await db.collection("products").insertOne(data);

        res.status(201).json({ message: "product added", result });
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
