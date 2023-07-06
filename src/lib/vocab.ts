import { Vocab } from "@/types/vocab";
import { v4 as uuid4 } from "uuid";
import { commonNounsCA } from "./vocabPacks/commonNouns/ca";
import { commonNounsDE } from "./vocabPacks/commonNouns/de";
import { commonNounsEN } from "./vocabPacks/commonNouns/en";
import { commonNounsES } from "./vocabPacks/commonNouns/es";
import { commonNounsFR } from "./vocabPacks/commonNouns/fr";
import { commonNounsIT } from "./vocabPacks/commonNouns/it";
import { commonNounsNL } from "./vocabPacks/commonNouns/nl";
import { commonNounsUK } from "./vocabPacks/commonNouns/uk";
import { rareNounsCA } from "./vocabPacks/rareNouns/ca";
import { LearningLanguages } from "@/types/general";

const currentDate = new Date().toISOString();

type VocabSet = { [vocabId: string]: Vocab };

export type VocabPackCommonNouns = Exclude<LearningLanguages, "other">;
export type VocabPackRareNouns = Extract<LearningLanguages, "ca">;
export const VocabPackCommonNounLanguages: VocabPackCommonNouns[] = [
  "ca",
  "de",
  "en",
  "es",
  "fr",
  "it",
  "nl",
  "uk",
];
export const VocabPackRareNounLanguages: VocabPackRareNouns[] = ["ca"];

export type VocabPackList = {
  commonNouns?: {
    language: VocabPackCommonNouns;
  };
  rareNouns?: {
    language: VocabPackRareNouns;
  };
};

export const initialVocabProperties: Omit<
  Vocab,
  "category" | "definition" | "imageURL" | "vocabId"
> = {
  createdAt: currentDate,
  currentBox: 0,
  dueDate: currentDate,
  lastUpdatedAt: currentDate,
  phoneticPronunciation: "",
};

export type VocabSetRaw = [
  string,
  string,
  string,
  string,
  Record<number, number>
][];

export const commonNounsVocabPackMap: {
  [key in VocabPackCommonNouns]: VocabSetRaw;
} = {
  ca: commonNounsCA,
  de: commonNounsDE,
  en: commonNounsEN,
  es: commonNounsES,
  fr: commonNounsFR,
  it: commonNounsIT,
  nl: commonNounsNL,
  uk: commonNounsUK,
};

export const rareNounsVocabPackMap: {
  [key in VocabPackRareNouns]: VocabSetRaw;
} = {
  ca: rareNounsCA,
};

export const combineVocabPacks = ({
  vocabPacks,
}: {
  vocabPacks: VocabPackList;
}) => {
  let combinedVocabPack: VocabSetRaw = [];

  for (const vocabPackName in vocabPacks) {
    const key = vocabPackName as keyof VocabPackList;
    const vocabPack = vocabPacks[key];

    if (vocabPack) {
      if (key === "commonNouns") {
        combinedVocabPack = combinedVocabPack.concat(
          commonNounsVocabPackMap[vocabPack.language as VocabPackCommonNouns]
        );
      }

      if (key === "rareNouns") {
        combinedVocabPack = combinedVocabPack.concat(
          rareNounsVocabPackMap[vocabPack.language as VocabPackRareNouns]
        );
      }
    }
  }

  return generateVocabSet({ vocabEntries: combinedVocabPack });
};

export const generateVocabSet = ({
  vocabEntries,
}: {
  vocabEntries: VocabSetRaw;
}) => {
  const newVocabSet: VocabSet = {};

  for (let i = 0; i < vocabEntries.length; i++) {
    const id = uuid4();

    newVocabSet[id] = {
      vocabId: id,
      blackoutWords: vocabEntries[i][4],
      category: "noun",
      definition: vocabEntries[i][0],
      description: vocabEntries[i][1],
      imageURL: `/images/vocabSets/${vocabEntries[i][2]}`,
      ...initialVocabProperties,
      phoneticPronunciation: vocabEntries[i][3],
    };
  }

  return newVocabSet;
};
