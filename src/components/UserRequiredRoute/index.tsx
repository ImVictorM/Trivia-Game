import { RootState } from "@/redux/store";
import { PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserRequiredRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const player = useSelector((state: RootState) => state.player);
  const [shouldRenderChildren, setShouldRenderChildren] = useState(false);

  useEffect(() => {
    const playerDataExists = player.name && player.gravatarImgSrc;

    if (!playerDataExists) {
      navigate("/");
    } else {
      setShouldRenderChildren(true);
    }
  }, [navigate, player.gravatarImgSrc, player.name]);

  return <>{shouldRenderChildren && children}</>;
}
