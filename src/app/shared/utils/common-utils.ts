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

export const convertHeight = (height: number, unit: string | undefined, centimetersUSAValues: any[]): number => {
  if (!unit || unit === 'china') {
    return Number.isInteger(height) ? height : Math.round(height);
  }

  if (unit === 'usa') {
    return centimetersUSAValues.reduce((prev: number, curr: number) =>
      Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev,
    );
  }

  return height;
};

export const convertDateTimeFromISOStringToOriginal = (stringDate: any) => {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  if (isoRegex.test(stringDate)) {
    return stringDate.split('.')[0];
  }

  return stringDate;
};

export const convertDateTimeFromOriginalToISOString = (originalDate: any) => {
  const dateObj = new Date(originalDate.replace(' ', 'T') + 'Z');
  return dateObj.toISOString();
};
