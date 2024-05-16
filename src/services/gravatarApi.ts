import getRandomDefaultAvatar from "@/utils/getRandomDefaultAvatar";
import axios from "axios";
import { SHA256 } from "crypto-js";

export async function getAvatarImg(gravatarEmail: string): Promise<string> {
  const formattedEmail = gravatarEmail.toLowerCase().trim();
  const emailHash = SHA256(formattedEmail).toString();

  try {
    // try to fetch user image from gravatar, if it fails, throws a 404 error
    await axios.get(`https://www.gravatar.com/avatar/${emailHash}?d=404&s=160`);

    return `https://www.gravatar.com/avatar/${emailHash}?s=160`;
  } catch (error) {
    // when fetch fails, returns a random image
    return getRandomDefaultAvatar();
  }
}
