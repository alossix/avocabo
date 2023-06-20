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

export const exampleVocabEntryDE: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 15: 18, 19: 24 },
    category: "noun",
    definition: "die Sonne",
    description:
      "Betrachten Sie die Sonne während einer Sonnenfinsternis niemals.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
    ...initialVocabProperties,
  },
};

export const initialVocabSetDE: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 15: 18, 19: 24 },
    category: "noun",
    definition: "die Sonne",
    description:
      "Betrachten Sie die Sonne während einer Sonnenfinsternis niemals.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
    ...initialVocabProperties,
  },
  [id2]: {
    vocabId: id2,
    blackoutWords: { 19: 24 },
    category: "noun",
    definition: "der Regen",
    description: "Wir beobachten den Regen während des Sturms.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
    ...initialVocabProperties,
  },
  [id3]: {
    vocabId: id3,
    blackoutWords: { 27: 32 },
    category: "noun",
    definition: "die Krone",
    description: "Der Schauspieler trug eine Krone auf dem Kopf.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
    ...initialVocabProperties,
  },
  [id4]: {
    vocabId: id4,
    blackoutWords: { 4: 7 },
    category: "noun",
    definition: "der Hut",
    description:
      "Ein Hut am Strand zu tragen hilft, Ihr Gesicht vor Sonnenschäden zu schützen.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
    ...initialVocabProperties,
  },
  [id5]: {
    vocabId: id5,
    blackoutWords: { 59: 65 },
    category: "noun",
    definition: "die Brille",
    description:
      "Jetzt, wo ich älter bin, muss ich beim Lesen häufiger eine Brille tragen.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
    ...initialVocabProperties,
  },
  [id6]: {
    vocabId: id6,
    blackoutWords: { 59: 66 },
    category: "noun",
    definition: "das T-Shirt",
    description:
      "Es ist ein warmer Tag, also habe ich mich entschieden, ein T-Shirt statt eines Pullovers anzuziehen.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
    ...initialVocabProperties,
  },
  [id7]: {
    vocabId: id7,
    blackoutWords: { 0: 3, 4: 8 },
    category: "noun",
    definition: "die Hose",
    description: "Die Hose bestand aus blauem Denim.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
    ...initialVocabProperties,
  },
};
