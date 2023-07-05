import { LearningLanguages } from "@/types/general";

export type VocabPackCommonNouns = Exclude<LearningLanguages, "other">;
export type VocabPackRareNouns = Extract<LearningLanguages, "ca">;

export type VocabPackList = {
  commonNouns?: VocabPackCommonNouns;
  rareNouns?: VocabPackRareNouns;
};
