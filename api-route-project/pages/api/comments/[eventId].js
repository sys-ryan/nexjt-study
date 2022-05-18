import { connectDatabase, insertDocument, getAllDocuments } from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed." });
    return;
  }

  if (req.method === "POST") {
    // add server-side validation
    const { email, name, text } = req.body;

    if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ message: "invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      client.close();
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    const db = client.db();
    // const documents = await db.collection("comments").find({ eventId }).sort({ _id: -1 }).toArray();

    try {
      const documents = await getAllDocuments(client, "comments", { eventId }, { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
      return;
    }
  }
  client.close();
};

export default handler;
