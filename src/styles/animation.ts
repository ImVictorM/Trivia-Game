import { css, keyframes } from "styled-components";

const scaleUpKeyframes = keyframes`
  from {
    transform: scale(0.8);
  }

  to {
    transform: scale(1);
  }
`;

const scaleDownKeyframes = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(0.8);
  }
`;

export const animations = {
  popupAnimation: (animateOut: boolean) => {
    const animationKeyframes = animateOut
      ? scaleDownKeyframes
      : scaleUpKeyframes;

    return css`
      animation: ${animationKeyframes} 0.15s ease-in-out;
    `;
  },
};
