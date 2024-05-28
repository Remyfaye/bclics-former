import mongoose from "mongoose";
import { Cart } from "../../../models/Cart";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const { item, userId } = await req.json();

  //   const session = await getServerSession(authOptions);
  //   const email = session?.user.email;

  const user = await User.findById({ _id: userId });
  const userCart = user.cart;

  const itemIsInCart = userCart.filter((c) => c._id === item._id);
  console.log(itemIsInCart);

  if (itemIsInCart.length < 1) {
    console.log("Object not found in the array");
    user.cart.push(item);
    await user.save();
  } else {
    console.log("Object found in the array");
  }

  return Response.json(true);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const { item, userId } = await req.json();

  //   const session = await getServerSession(authOptions);
  //   const email = session?.user.email;

  const user = await User.findById({ _id: userId });
  const userCart = user.cart;

  const cartItemToDelete = userCart.filter((c) => c._id === item._id);

  await User.findByIdAndUpdate(
    userId,
    { $pull: { cart: { _id: item._id } } },
    { new: true }
  );

  // console.log(item._id);

  return Response.json(true);
}

export async function GET(req) {
  try {
    mongoose.connect(process.env.MONGODB_URL);

    const url = new URL(req.url);
    const userId = url.searchParams.get("_id");

    // console.log(email);
    const user = await User.findById({ _id: userId });
    const cartItems = user?.cart;

    return Response.json({ cartItems, user });
  } catch (error) {
    console.log("Internal Server Error");
  }
}
