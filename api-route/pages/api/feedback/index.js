import fs from "fs/promises";
import path from "path";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, text } = req.body;

    console.log(req.body);
    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = await fs.readFile(filePath);
    const data = JSON.parse(fileData);
    data.push(newFeedback);
    await fs.writeFile(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = await fs.readFile(filePath);
    const data = JSON.parse(fileData);
    res.status(200).json({ feedback: data });
  }
};

export default handler;
