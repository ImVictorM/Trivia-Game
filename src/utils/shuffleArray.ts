export default function shuffleArray<T>(array: T[]): T[] {
  for (let index = array.length - 1; index > 0; index -= index) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }

  return array;
}
