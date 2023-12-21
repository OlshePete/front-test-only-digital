export function calculateStepsToTarget(prevIndex: number, newIndex: number, length: number) {
  if (newIndex === prevIndex) return 0;
  let positiveStep = 0;
  if (newIndex < prevIndex) {
    positiveStep = prevIndex - newIndex;
  } else {
    positiveStep = length - (newIndex + 1) + (prevIndex + 1);
  }
  if (positiveStep > length - positiveStep) return -(length - positiveStep);

  return positiveStep;
}
