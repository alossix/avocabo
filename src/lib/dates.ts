export const newShortDate = (dateString?: string) => {
  if (dateString) {
    return new Date(dateString).toISOString().slice(0, 10);
  } else {
    return new Date().toISOString().slice(0, 10);
  }
};

export const formatTimeHoursAndMinutes = (milliseconds: number) => {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};
