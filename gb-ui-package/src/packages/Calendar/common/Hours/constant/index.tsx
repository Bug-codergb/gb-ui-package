const getHour = () => {
  const hours: string[] = [];
  for (let i = 0; i < 13; i++){
    hours.push(`${i.toString().padStart(2, "0")}:00`);
  }
  hours.push("00:00");
  return hours;
}

export {
  getHour
}