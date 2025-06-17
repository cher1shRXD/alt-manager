export const getNextMonday = (): { daysLeft: number; nextMonday: string } => {
  const today = new Date();
  const currentDay = today.getDay();
  const daysLeft = (8 - currentDay) % 7 || 7;

  const nextMondayDate = new Date(today);
  nextMondayDate.setDate(today.getDate() + daysLeft);

  const month = String(nextMondayDate.getMonth() + 1).padStart(2, '0');
  const day = String(nextMondayDate.getDate()).padStart(2, '0');
  const nextMonday = `${month}.${day}`;

  return { daysLeft, nextMonday };
};