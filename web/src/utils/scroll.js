import { isNonNullable } from "./equals";

const animateScroll = ({ targetPosition, initialPosition, duration }) => {
  let start = null;
  let position = null;
  let animationFrame = null;

  const maxAvailableScroll =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const amountOfPixelsToScroll = initialPosition - targetPosition;

  const step = (timestamp) => {
    if (!isNonNullable(start)) {
      start = timestamp;
    }

    const elapsed = timestamp - start;
    const relativeProgress = elapsed / duration;
    const easedProgress = 1 - Math.pow(1 - relativeProgress, 4);

    position =
      initialPosition - amountOfPixelsToScroll * Math.min(easedProgress, 1);

    window.scrollTo(0, position);

    if (
      initialPosition !== maxAvailableScroll &&
      window.scrollY === maxAvailableScroll
    ) {
      window.cancelAnimationFrame(animationFrame);

      return;
    }

    if (elapsed < duration) {
      animationFrame = window.requestAnimationFrame(step);
    }
  };

  animationFrame = window.requestAnimationFrame(step);
};

export const scrollTo = ({ elem, offset = 0, duration = 500 }) => {
  const initialPosition = window.scrollY;
  const targetPosition = elem.offsetTop - offset;

  animateScroll({
    targetPosition,
    initialPosition,
    duration,
  });
};
