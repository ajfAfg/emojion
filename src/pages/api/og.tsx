import { ImageResponse } from "@vercel/og";
import { OgiriPicture } from "@/features/OgiriPicture";
import { NextApiRequest } from "next";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req: NextApiRequest) {
  const { searchParams } = new URL(req.url ?? "");
  const emoji = searchParams.get("emoji") ?? "";
  const text = searchParams.get("text") ?? "";

  return new ImageResponse(<OgiriPicture emoji={emoji} text={text} />, {
    width: 764,
    height: 464, // NOTE: Height of text expected to be 2 lines long
  });
}
