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

export const exampleVocabEntryFR: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 19: 21, 22: 28 },
    category: "noun",
    definition: "le soleil",
    description: "Ne regardez jamais le soleil pendant une éclipse.",
    imageURL: "/public/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const initialVocabSetFR: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 19: 21, 22: 28 },
    category: "noun",
    definition: "le soleil",
    description: "Ne regardez jamais le soleil pendant une éclipse.",
    imageURL: "/public/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
  [id2]: {
    vocabId: id2,
    blackoutWords: { 15: 17, 18: 23 },
    category: "noun",
    definition: "la pluie",
    description: "Nous regardons la pluie pendant l'orage.",
    imageURL: "/public/images/vocabSets/rain.jpeg",
    ...initialVocabProperties,
  },
  [id3]: {
    vocabId: id3,
    blackoutWords: { 21: 29 },
    category: "noun",
    definition: "la couronne",
    description: "L'acteur portait une couronne sur la tête.",
    imageURL: "/public/images/vocabSets/crown.jpeg",
    ...initialVocabProperties,
  },
  [id4]: {
    vocabId: id4,
    blackoutWords: { 10: 17 },
    category: "noun",
    definition: "le chapeau",
    description:
      "Porter un chapeau à la plage aide à protéger votre visage des dommages causés par le soleil.",
    imageURL: "/public/images/vocabSets/hat.jpeg",
    ...initialVocabProperties,
  },
  [id5]: {
    vocabId: id5,
    blackoutWords: { 59: 67 },
    category: "noun",
    definition: "les lunettes",
    description:
      "Maintenant que je suis plus âgé, j'ai besoin de porter des lunettes pour lire plus souvent.",
    imageURL: "/public/images/vocabSets/glasses.jpeg",
    ...initialVocabProperties,
  },
  [id6]: {
    vocabId: id6,
    blackoutWords: { 58: 65 },
    category: "noun",
    definition: "le t-shirt",
    description:
      "Il fait chaud aujourd'hui, alors j'ai décidé de mettre un t-shirt au lieu d'un pull.",
    imageURL: "/public/images/vocabSets/t-shirt.jpeg",
    ...initialVocabProperties,
  },
  [id7]: {
    vocabId: id7,
    blackoutWords: { 0: 2, 3: 11 },
    category: "noun",
    definition: "le pantalon",
    description: "Le pantalon était en denim bleu.",
    imageURL: "/public/images/vocabSets/pants.jpeg",
    ...initialVocabProperties,
  },
};
