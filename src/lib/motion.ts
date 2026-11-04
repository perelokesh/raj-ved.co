// Shared easing and timing so motion feels like one system.
export const ease = [0.22, 1, 0.36, 1] as const;

export const durations = {
  micro: 0.4,
  reveal: 0.9,
  hero: 1.1,
} as const;

export const riseIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: durations.reveal, ease },
};
