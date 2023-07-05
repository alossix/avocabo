import { generateVocabSet } from "@/lib/initialVocab";
import { Vocab } from "@/types/vocab";

export const rareNounsCA: { [vocabId: string]: Vocab } = {};

const vocabEntries: [string, string, string, string, Record<number, number>][] =
  [
    [
      "el xirimirí",
      "Quan hem sortit de casa, ha començat a caure un xirimirí.",
      "rain.jpeg",
      "/ʃi.ɾi.miˈɾi/",
      {},
    ],
  ];

const newVocabSet = generateVocabSet({ vocabEntries });

Object.assign(rareNounsCA, newVocabSet);
