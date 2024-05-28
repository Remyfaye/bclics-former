import mongoose from "mongoose";
import { Menu } from "../../../models/Menu";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const data = await req.json();

  const newMenu = await Menu.create(data);
  console.log(newMenu);
  return Response.json(newMenu);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const { _id, ...data } = await req.json();
  console.log(data);

  await Menu.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const { _id } = await req.json();
  console.log(_id);

  await Menu.findByIdAndDelete(_id);
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGODB_URL);
  return Response.json(await Menu.find());
}
