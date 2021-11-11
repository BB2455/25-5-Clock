// Formats seconds into MM:SS with optional type "min" to just return minutes.
export const formatTime = (seconds, type) => {
  const _minutes = Math.floor(seconds / 60);
  const _seconds = seconds % 60;
  if (type === "min") {
    return _minutes;
  }
  return (
    (_minutes < 10 ? "0" + _minutes : _minutes) +
    ":" +
    (_seconds < 10 ? "0" + _seconds : _seconds)
  );
};
