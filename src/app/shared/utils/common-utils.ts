// constants
import { poundsToKilogram } from 'src/app/shared/constants/pounds-to-kilogram';

export const enableDarkMode = (darkMode: boolean) => {
  return document.body.classList.toggle('dark-theme', darkMode);
};

export const convertWeight = (
  history: any,
  updatedSetting: any,
  kilogramsUSAValues: any[],
  isTextFormat: boolean = false,
) => {
  if (!updatedSetting) return history;

  const newHistory = { ...history };

  if (updatedSetting.unit === 'usa') {
    const closestHistoryWeight = kilogramsUSAValues.reduce((prev: any, curr: any) =>
      Math.abs(curr - newHistory.weight) < Math.abs(prev - newHistory.weight) ? curr : prev,
    );

    const matchedWeight = poundsToKilogram.find((item) => item.value === closestHistoryWeight);
    if (matchedWeight) {
      newHistory.weight = isTextFormat ? matchedWeight.text : matchedWeight.value;
    }
  } else if (updatedSetting.unit === 'china') {
    newHistory.weight = Number.isInteger(newHistory.weight) ? newHistory.weight : Math.round(newHistory.weight);
  }
  return newHistory;
};
