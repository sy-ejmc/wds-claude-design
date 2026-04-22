/**
 * WDS Primitive Tokens (V1, Figma var-set `3003:11976`)
 *
 * INTERNAL IMPLEMENTATION. Do NOT import this from components.
 * Components must consume tokens through `./alias` (or the package root).
 * A palette swap or theme change touches only the alias layer; this
 * primitive layer is the single source of raw values.
 *
 * Source of truth: Figma Variables export, 2026-04-22 (WDS v1.2.0).
 * Palette groups: blue, red, orange, green, navy, purple,
 * gray (Neutral colors), coolgray (Cool Neutral), neutralA (Alpha colors),
 * chart (Chart color).
 *
 * Neutral gray hex values are derived from Figma HSLA sources
 * (see inline `// hsla(...)` comments) and may differ by ±1 unit
 * from the older repo values.
 */
export const primitive = {
  color: {
    blue: {
      50:  "#EEF7FF",
      100: "#CBE8FF",
      200: "#A7D9FF",
      300: "#68BBFF",
      400: "#329CFF",
      500: "#067DFD",
      600: "#0062E5",
      700: "#0048C8",
      800: "#0231A6",
      900: "#072182",
    },
    red: {
      50:  "#FFF5F5",
      100: "#FFDADB",
      200: "#FFBFBF",
      300: "#FF8585",
      400: "#FF5454",
      500: "#EF2B2A",
      600: "#DA120D",
      700: "#BF0A03",
      800: "#9F0A01",
      900: "#7D0800",
    },
    orange: {
      50:  "#FDF6F3",
      100: "#FFE1D3",
      200: "#FFCCB2",
      300: "#FF9E70",
      400: "#FF7638",
      500: "#F9560E",
      600: "#DA4000",
      700: "#B43200",
      800: "#882400",
      900: "#5E2700",
    },
    green: {
      50:  "#F6FBFA",
      100: "#EEF7F6",
      200: "#DAF0EF",
      300: "#BFE8E4",
      400: "#86CEC7",
      500: "#18A19A",
      600: "#168B88",
      700: "#137271",
      800: "#145B5A",
      900: "#154C4B",
    },
    navy: {
      50:  "#DFEEF5",
      100: "#B0D3E8",
      200: "#85B9D9",
      300: "#5F9ECA",
      400: "#458CC0",
      500: "#307CB8",
      600: "#2870AB",
      700: "#1F5F99",
      800: "#195086",
      900: "#0E3767",
    },
    purple: {
      50:  "#EEF4FF",
      100: "#E1EBFE",
      200: "#C8DAFD",
      300: "#A7BFFA",
      400: "#849DF5",
      500: "#6478ED",
      600: "#4A54E1",
      700: "#3C43C6",
      800: "#333AA0",
      900: "#30377F",
    },
    /** Neutral colors group. Hex derived from Figma HSLA values. */
    gray: {
      white: "#FFFFFF",
      50:   "#F7F8F9",
      100:  "#F3F4F5",
      200:  "#EEEFF1",
      300:  "#E0E0E1", // hsla(240, 2%, 88%, 1)
      400:  "#C6C7C8", // hsla(210, 2%, 78%, 1)
      500:  "#B0B3BA",
      600:  "#9C9C9C", // hsla(0, 0%, 61%, 1)
      700:  "#868688", // hsla(240, 1%, 53%, 1)
      800:  "#48494C", // hsla(228, 3%, 29%, 1)
      900:  "#292929", // hsla(0, 0%, 16%, 1)
      1000: "#161618", // hsla(240, 4%, 9%, 1)
      black: "#000000",
    },
    /** Cool Neutral group — darker / colder gray scale. */
    coolgray: {
      5:  "#0F0F10",
      7:  "#141415",
      10: "#16171A", // hsla(240, 4%, 9%, 1)
      15: "#1B1C1E",
      17: "#212225",
      20: "#292A2D",
      22: "#2E2F33",
      23: "#333438",
      25: "#37383C",
      30: "#46474C",
      40: "#5A5C63",
      50: "#70737C",
      60: "#878A93",
      70: "#989BA2",
      80: "#AEB0B6",
      90: "#C2C4C8",
      95: "#DBDCDF",
      96: "#E1E2E4",
      97: "#EAEBEC",
      98: "#F4F4F5",
      99: "#F7F7F8",
    },
    /** Alpha colors group — transparent black overlays. 8-digit hex (#RRGGBBAA) = hsla(0,0%,0%,n). */
    neutralA: {
      10: "#0000001A", //  10% black — hsla(0,0%,0%,0.1)
      20: "#00000033", //  20% black
      30: "#0000004D", //  30% black
      40: "#00000066", //  40% black
      50: "#00000080", //  50% black
      60: "#00000099", //  60% black
      70: "#000000B3", //  70% black — hsla(0,0%,0%,0.7)
      80: "#000000CC", //  80% black
      90: "#000000E6", //  90% black — hsla(0,0%,0%,0.9)
    },
    /** Chart colors group — 11-step categorical palette for data visualization. Figma: `Chart color`. */
    chart: {
      1:  "#18A19A",  // = green.500
      2:  "#E37570",
      3:  "#EDA942",
      4:  "#8BD17D",
      5:  "#61A4EC",
      6:  "#887BE9",
      7:  "#3C4BA5",
      8:  "#D9874B",
      9:  "#CF778B",
      10: "#A68673",
      11: "#C4C4C4",
    },
  },
} as const;
