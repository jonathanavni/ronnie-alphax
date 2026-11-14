/**
 * Sample "photos" for the translation mock-up (#/translate).
 * The prototype does not use the camera or a real translator: it shows one of these
 * and then its ready-made translation.
 */
export type TranslateSample = {
  id: "sign" | "menu";
  /** Shown on the first screen: "A sign" / "A menu". */
  label: string;
  hint: string;
  /** Each line on the sign or menu: the original words and what they mean. */
  lines: { original: string; english: string; price?: string }[];
  /** A personal note for Margaret: what this means for *her*. */
  advice: string;
};

export const TRANSLATE_SAMPLES: TranslateSample[] = [
  {
    id: "sign",
    label: "A sign",
    hint: "Street signs, notices, timetables",
    lines: [
      { original: "Elevador avariado", english: "The lift is out of order" },
      { original: "Use a entrada lateral", english: "Please use the side entrance" },
    ],
    advice: "The side entrance has no steps. It is 1 minute away, on your left.",
  },
  {
    id: "menu",
    label: "A menu",
    hint: "Restaurant and café menus",
    lines: [
      { original: "Ementa do dia", english: "Today's menu" },
      { original: "Sopa de legumes", english: "Vegetable soup", price: "€4" },
      { original: "Bacalhau à Brás", english: "Salt cod with egg and potato", price: "€12" },
      { original: "Frango grelhado com arroz", english: "Grilled chicken with rice", price: "€10" },
      { original: "Pastel de nata", english: "Custard tart", price: "€2" },
    ],
    advice: "The custard tart is sweet. The soup and the grilled chicken have no added sugar.",
  },
];
