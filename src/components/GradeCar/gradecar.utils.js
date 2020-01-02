export const gradeLetters = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1
};

export const gradeScale = carWeightedScore => {
  let result;
  switch (true) {
    case carWeightedScore >= 95 && carWeightedScore <= 100:
      result = "A";
      break;
    case carWeightedScore >= 70 && carWeightedScore < 95:
      result = "B";
      break;
    case carWeightedScore >= 49 && carWeightedScore < 70:
      result = "C";
      break;
    case carWeightedScore >= 35 && carWeightedScore < 49:
      result = "D";
      break;
    case carWeightedScore >= 0 && carWeightedScore < 35:
      result = "E";
      break;
    default:
      result = "Error";
  }
  return result;
};

export const dictateColorSetting = grade => {
  switch (grade) {
    case "A":
      return "green";
    case "B":
      return "light-green";
    case "C":
      return "yellow";
    case "D":
      return "light-red";
    case "E":
      return "red";
    default:
      return "green";
  }
};

export const remove = (obj, props = []) => {
  let newObj = { ...obj };
  for (let prop of props) {
    delete newObj[prop];
  }
  return newObj;
};
