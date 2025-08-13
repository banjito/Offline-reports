// Temperature conversion and TCF utilities based on provided code

export const convertFahrenheitToCelsius = (fahrenheit: number): number => {
  return parseFloat((((fahrenheit - 32) * 5) / 9).toFixed(1));
};

// Reduced TCF lookup with interpolation (values from the user's code snippet)
const TCF_DATA: { celsius: number; multiplier: number }[] = [
  { celsius: -24, multiplier: 0.054 },
  { celsius: -20, multiplier: 0.11 },
  { celsius: -10, multiplier: 0.25 },
  { celsius: 0, multiplier: 0.4 },
  { celsius: 5, multiplier: 0.5 },
  { celsius: 10, multiplier: 0.63 },
  { celsius: 15, multiplier: 0.81 },
  { celsius: 20, multiplier: 1 },
  { celsius: 25, multiplier: 1.25 },
  { celsius: 30, multiplier: 1.58 },
  { celsius: 35, multiplier: 2 },
  { celsius: 40, multiplier: 2.5 },
  { celsius: 45, multiplier: 3.15 },
  { celsius: 50, multiplier: 3.98 },
  { celsius: 60, multiplier: 6.3 },
  { celsius: 70, multiplier: 10 },
  { celsius: 80, multiplier: 15.8 },
  { celsius: 90, multiplier: 25.2 },
  { celsius: 100, multiplier: 40 },
];

export const getTCF = (celsius: number): number => {
  if (Number.isNaN(celsius)) return 1;
  if (celsius <= TCF_DATA[0].celsius) return TCF_DATA[0].multiplier;
  if (celsius >= TCF_DATA[TCF_DATA.length - 1].celsius) return TCF_DATA[TCF_DATA.length - 1].multiplier;
  // exact match
  for (const p of TCF_DATA) if (p.celsius === celsius) return p.multiplier;
  // interpolate
  for (let i = 0; i < TCF_DATA.length - 1; i++) {
    const a = TCF_DATA[i];
    const b = TCF_DATA[i + 1];
    if (celsius > a.celsius && celsius < b.celsius) {
      const t = (celsius - a.celsius) / (b.celsius - a.celsius);
      return a.multiplier + t * (b.multiplier - a.multiplier);
    }
  }
  return 1;
};

export const applyTCF = (reading: string, tcf: number): string => {
  const trimmed = (reading ?? '').toString().trim();
  if (!trimmed) return '';
  if (trimmed === '>2200') return '>2200';
  if (trimmed.toUpperCase() === 'N/A') return 'N/A';
  const n = parseFloat(trimmed);
  if (Number.isNaN(n)) return trimmed;
  return (n * tcf).toFixed(2);
};


