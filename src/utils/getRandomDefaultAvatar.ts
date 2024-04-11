import * as defaultImages from "@/assets/defaultAvatars";

export default function getRandomDefaultAvatar(): string {
  const imagesSrc = Object.values(defaultImages);
  const randomPosition = Math.floor(Math.random() * imagesSrc.length);
  return imagesSrc[randomPosition];
}
