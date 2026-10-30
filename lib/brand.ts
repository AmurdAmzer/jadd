// One place for everything that differs between brands (ADR-003).
// Pages import `brand` instead of typing the name, tagline or tutor directly.

type Brand = {
  name: string;
  tagline: string;
  tutor: string;
  logo: { src: string; width: number; height: number };
};

const brands = {
  jadd: {
    name: "Jadd",
    tagline: "Algebra 1 practice",
    tutor: "Mr. Adams",
    logo: { src: "/brand/jadd-lockup-horizontal.svg", width: 399, height: 160 },
  },
} satisfies Record<string, Brand>;

type BrandKey = keyof typeof brands;

function loadBrand(): Brand {
  const key = process.env.BRAND;
  if (!key) {
    throw new Error("BRAND is not set. Add BRAND=jadd to .env (and to Vercel's environment variables).");
  }
  if (!(key in brands)) {
    throw new Error(`Unknown BRAND "${key}". Known brands: ${Object.keys(brands).join(", ")}`);
  }
  return brands[key as BrandKey];
}

export const brand = loadBrand();
