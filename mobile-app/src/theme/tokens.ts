export const colors = {
  background: "#0A0A0A",
  surface: "#111415",
  surfaceContainer: "#1E2021",
  surfaceContainerLow: "#1A1C1D",
  primaryContainer: "#0A0A0A",
  onSurface: "#E2E2E4",
  onSurfaceVariant: "#C4C7C7",
  primary: "#C9C6C5",
  outlineVariant: "#444748",
  connected: "#22C55E",
  connectedText: "#4ADE80",
  ambientBlue: "rgba(46, 91, 255, 0.1)",
} as const;

export const spacing = {
  gridGutter: 12,
  containerPadding: 24,
  unit: 4,
  stackGap: 16,
  touchTargetMin: 44,
} as const;

export const radii = {
  md: 16,
  lg: 32,
  full: 9999,
} as const;

export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
} as const;

export const typography = {
  displayLg: {
    fontSize: 44,
    lineHeight: 52,
    fontFamily: fonts.semiBold,
    letterSpacing: -0.88,
  },
  headlineMd: { fontSize: 24, lineHeight: 32, fontFamily: fonts.medium },
  headlineSm: { fontSize: 20, lineHeight: 28, fontFamily: fonts.medium },
  headlineLgMobile: { fontSize: 28, lineHeight: 36, fontFamily: fonts.semiBold },
  labelMd: { fontSize: 14, lineHeight: 20, fontFamily: fonts.medium, letterSpacing: 0.14 },
  labelSm: { fontSize: 12, lineHeight: 16, fontFamily: fonts.semiBold, letterSpacing: 0.6 },
} as const;
