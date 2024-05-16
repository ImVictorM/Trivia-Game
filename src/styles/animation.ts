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

const bounceInRightKeyframes = keyframes`
0% {
    opacity: 0;
    transform: translateX(300px);
  }
  60% {
    opacity: 1;
    transform: translateX(-30px);
  }
  80% { 
    transform: translateX(10px); 
  }
  100% { 
    transform: translateX(0); 
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
  bounceInRightAnimation: () => {
    return css`
      animation: ${bounceInRightKeyframes} 0.3s ease;
    `;
  },
};
