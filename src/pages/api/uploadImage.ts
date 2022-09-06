import { updateStatuses, uploadMedia } from "@/lib/twitterAPI";
import type { NextApiRequest, NextApiResponse } from "next";

// NOTE: use-case
const uploadImage = async (encodedImage: string): Promise<string> => {
  const { media_id_string } = (await uploadMedia({
    media_data: encodedImage,
  })) as any;

  const {
    entities: { media },
  } = (await updateStatuses({
    status: "",
    media_ids: [media_id_string],
  })) as any;
  const { display_url } = media[0];

  return display_url;
};

interface Request extends NextApiRequest {
  body: {
    encodedImage: string;
  };
}
type Response = { imageUrl: string } | { message: any };
export default function handler(req: Request, res: NextApiResponse<Response>) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
  }
  uploadImage(req.body.encodedImage)
    .then((url) => res.status(200).json({ imageUrl: url }))
    .catch((error) => res.status(400).json({ message: error }));
}
