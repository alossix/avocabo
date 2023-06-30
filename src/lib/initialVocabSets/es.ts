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

export const exampleVocabEntryES: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 15: 18 },
    category: "noun",
    definition: "el sol",
    description: "Nunca mires al sol durante un eclipse.",
    imageURL: "/public/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const initialVocabSetES: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 15: 18 },
    category: "noun",
    definition: "el sol",
    description: "Nunca mires al sol durante un eclipse.",
    imageURL: "/public/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
  [id2]: {
    vocabId: id2,
    blackoutWords: { 8: 10, 11: 17 },
    category: "noun",
    definition: "la lluvia",
    description: "Miramos la lluvia durante la tormenta.",
    imageURL: "/public/images/vocabSets/rain.jpeg",
    ...initialVocabProperties,
  },
  [id3]: {
    vocabId: id3,
    blackoutWords: { 21: 27 },
    category: "noun",
    definition: "la corona",
    description: "El actor llevaba una corona en su cabeza.",
    imageURL: "/public/images/vocabSets/crown.jpeg",
    ...initialVocabProperties,
  },
  [id4]: {
    vocabId: id4,
    blackoutWords: { 8: 16 },
    category: "noun",
    definition: "el sombrero",
    description:
      "Usar un sombrero en la playa ayuda a proteger tu rostro del daño solar.",
    imageURL: "/public/images/vocabSets/hat.jpeg",
    ...initialVocabProperties,
  },
  [id5]: {
    vocabId: id5,
    blackoutWords: { 35: 40 },
    category: "noun",
    definition: "las gafas",
    description:
      "Ahora que soy mayor, necesito usar gafas para leer con más frecuencia.",
    imageURL: "/public/images/vocabSets/glasses.jpeg",
    ...initialVocabProperties,
  },
  [id6]: {
    vocabId: id6,
    blackoutWords: { 43: 51 },
    category: "noun",
    definition: "la camiseta",
    description:
      "Hace calor hoy, así que decidí ponerme una camiseta en lugar de un suéter.",
    imageURL: "/public/images/vocabSets/t-shirt.jpeg",
    ...initialVocabProperties,
  },
  [id7]: {
    vocabId: id7,
    blackoutWords: { 0: 3, 4: 14 },
    category: "noun",
    definition: "los pantalones",
    description: "Los pantalones eran de mezclilla azul.",
    imageURL: "/public/images/vocabSets/pants.jpeg",
    ...initialVocabProperties,
  },
};
