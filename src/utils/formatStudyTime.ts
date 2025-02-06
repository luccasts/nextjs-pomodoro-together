export const formatStudyTime = (timeInSeconds: string) => {
  const timeInMinutes = Math.floor(Number(timeInSeconds) / 60); // Converter segundos para minutos

  if (timeInMinutes < 60) {
    return `${timeInMinutes}m`; // Exibe apenas minutos
  } else {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}h ${minutes}m`; // Exibe horas e minutos
  }
};
