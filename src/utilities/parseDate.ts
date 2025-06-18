export const parseDate = (date?: Date): string => {
  if(!date) {
    return `00-00-00`
  }
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yy}년 ${mm}월 ${dd}일`;
};