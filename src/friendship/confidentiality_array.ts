import { confidentiality } from '@prisma/client';

const levels: confidentiality[] = [
  confidentiality.MAXIMUM,
  confidentiality.CRITICAL,
  confidentiality.MIDDLING,
  confidentiality.MINIMUM,
];

export function getLevel(level: confidentiality): confidentiality[] {
  const index = levels.indexOf(level);
  if (index < 0) return [];
  return levels.slice(index);
}
