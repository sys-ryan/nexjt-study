import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !email.includes("@") || !password || !password.trim().length > 4) {
      res.status(422).json({
        message: "Invalid input.",
      });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    // email already in use check
    // ...

    const user = await db.collection("users").findOne({ email });
    console.log(user);
    if (user) {
      res.status(422).json({ message: "User exists already" });
      // client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user." });
  }
};

export default handler;
