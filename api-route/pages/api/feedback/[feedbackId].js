import fs from "fs/promises";
import path from "path";

const handler = async (req, res) => {
  const feedbackId = req.query.feedbackId;
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileContent = await fs.readFile(filePath);
  const feedbackData = JSON.parse(fileContent);

  const selectedFeedback = feedbackData.find((feedback) => feedback.id === feedbackId);

  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
