import { hashPassword } from "../../../lib/auth";
import { getSession } from "next-auth/client";
import { getClientBuildManifest } from "next/dist/client/route-loader";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({
    req: req,
  });

  if (!session) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    res.status(404).json({ message: "user not found." });
    return;
  }
  console.log(user);

  const currentPassword = user.password;
  console.log(req.body);
  console.log(currentPassword);
  const isValid = await verifyPassword(oldPassword, currentPassword);

  if (!isValid) {
    res.status(403).json({ message: "Invalid password." });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  console.log(hashedPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  res.status(200).json({ message: "Password updated!" });
};

export default handler;
