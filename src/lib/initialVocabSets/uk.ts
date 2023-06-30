import { Vocab } from "@/types/vocab";
import { v4 as uuid4 } from "uuid";
import { initialVocabProperties } from "../initialVocab";

const id1 = uuid4();
const id2 = uuid4();
const id3 = uuid4();
const id4 = uuid4();
const id5 = uuid4();
const id6 = uuid4();
const id7 = uuid4();

export const exampleVocabEntryUK: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 22: 27 },
    category: "noun",
    definition: "сонце",
    description: "Ніколи не дивіться на сонце під час сонячного затемнення.",
    imageURL: "/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const initialVocabSetUK: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 22: 27 },
    category: "noun",
    definition: "сонце",
    description: "Ніколи не дивіться на сонце під час сонячного затемнення.",
    imageURL: "/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
  [id2]: {
    vocabId: id2,
    blackoutWords: { 20: 25 },
    category: "noun",
    definition: "дощ",
    description: "Ми спостерігаємо за дощем під час грози.",
    imageURL: "/images/vocabSets/rain.jpeg",
    ...initialVocabProperties,
  },
  [id3]: {
    vocabId: id3,
    blackoutWords: { 12: 18 },
    category: "noun",
    definition: "корона",
    description: "Актор носив корону на голові.",
    imageURL: "/images/vocabSets/crown.jpeg",
    ...initialVocabProperties,
  },
  [id4]: {
    vocabId: id4,
    blackoutWords: { 8: 16 },
    category: "noun",
    definition: "капелюх",
    description:
      "Носіння капелюха на пляжі допомагає захистити обличчя від ушкоджень сонцем.",
    imageURL: "/images/vocabSets/hat.jpeg",
    ...initialVocabProperties,
  },
  [id5]: {
    vocabId: id5,
    blackoutWords: { 58: 67 },
    category: "noun",
    definition: "окуляри",
    description:
      "Тепер, коли я старію, мені потрібно частіше користуватися окулярами для читання.",
    imageURL: "/images/vocabSets/glasses.jpeg",
    ...initialVocabProperties,
  },
  [id6]: {
    vocabId: id6,
    blackoutWords: { 43: 51 },
    category: "noun",
    definition: "футболка",
    description:
      "Сьогодні спекотно, тому я вирішив одягнути футболку замість светра.",
    imageURL: "/images/vocabSets/t-shirt.jpeg",
    ...initialVocabProperties,
  },
  [id7]: {
    vocabId: id7,
    blackoutWords: { 0: 5 },
    category: "noun",
    definition: "штани",
    description: "Штани були з синього деніму.",
    imageURL: "/images/vocabSets/pants.jpeg",
    ...initialVocabProperties,
  },
};
