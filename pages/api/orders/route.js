import { User } from "@/app/models/User";
import { Order } from "../../../models/Order";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const data = await req.json();
  const userId = data.buyerId;
  const cart = data.cart;
  //   console.log(cart);

  const createdOrder = await Order.create(data);

  await User.findByIdAndUpdate(userId, { $unset: { cart: "" } }, { new: true });
  //   console.log(createdOrder);
  return Response.json(createdOrder);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGODB_URL);

  const orders = await Order.find();
  return Response.json(orders);
}
