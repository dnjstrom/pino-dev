export const levelToString = (level: number): string => {
  switch (level) {
    case 60:
      return "Fatal";
    case 50:
      return "Error";
    case 40:
      return "Warn";
    case 30:
      return "Info";
    case 20:
      return "Debug";
    case 10:
      return "Trace";
    default:
      return "Unknown";
  }
};
