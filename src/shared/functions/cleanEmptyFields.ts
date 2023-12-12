export default function cleanEmptyFields(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(cleanEmptyFields);
  }

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => [key, cleanEmptyFields(value)])
  );
}
