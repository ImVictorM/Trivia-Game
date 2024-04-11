import { SHA256 } from "crypto-js";

export function getAvatarImg(gravatarEmail: string): string {
  const formattedEmail = gravatarEmail.toLowerCase().trim();
  const emailHash = SHA256(formattedEmail).toString();

  return `https://www.gravatar.com/avatar/${emailHash}?d=retro&s=160`;
}
