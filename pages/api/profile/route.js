import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
// import { User } from "../../../models/User";

export async function PUT(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const data = await req.json();

  // const session = await getServerSession(authOptions);
  // const email = session.user.email;

  const email = data.email;
  console.log(email);

  await User.updateOne({ email }, data);
  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  const user = await User.findOne({ email });
  return Response.json(user);
}
