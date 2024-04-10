import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

type Player = {
  name: string;
  gravatarImgSrc: string;
  score: number;
};

export default function usePlayerRanking() {
  const MAX_PLAYERS_IN_RANKING = 3;
  const [playersRanking, setPlayersRanking] = useLocalStorage<Player[]>(
    "ranking",
    []
  );

  const updateRanking = useCallback(
    (player: Player) => {
      setPlayersRanking((prevPlayersRanking) => {
        const updatedPlayersRanking: Player[] = [];
        let playerWasInserted = false;
        let index = 0;
        while (!playerWasInserted && index < MAX_PLAYERS_IN_RANKING) {
          const playerInRanking = prevPlayersRanking[index];

          if (playerInRanking) {
            if (player.score > playerInRanking.score) {
              updatedPlayersRanking.push(player);
              const rest = prevPlayersRanking.slice(
                index,
                MAX_PLAYERS_IN_RANKING
              );
              updatedPlayersRanking.push(...rest);
              playerWasInserted = true;
            } else {
              updatedPlayersRanking.push(playerInRanking);
              index += 1;
            }
          } else {
            updatedPlayersRanking.push(player);
            playerWasInserted = true;
          }
        }
        return updatedPlayersRanking;
      });
    },
    [setPlayersRanking]
  );

  return { playersRanking, updateRanking };
}
