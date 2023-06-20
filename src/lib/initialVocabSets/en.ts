import { v4 as uuid4 } from "uuid";
import { initialVocabProperties } from "../initialVocab";
import { Vocab } from "@/types/vocab";

const id1 = uuid4();
const id2 = uuid4();
const id3 = uuid4();
const id4 = uuid4();
const id5 = uuid4();
const id6 = uuid4();
const id7 = uuid4();

export const exampleVocabEntryEN: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 18: 21 },
    category: "noun",
    definition: "sun",
    description: "Never look at the sun during an eclipse.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
    ...initialVocabProperties,
  },
};

export const initialVocabSetEN: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 18: 21 },
    category: "noun",
    definition: "sun",
    description: "Never look at the sun during an eclipse.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
    ...initialVocabProperties,
  },
  [id2]: {
    vocabId: id2,
    blackoutWords: { 13: 17 },
    category: "noun",
    definition: "rain",
    description: "We watch the rain during the storm.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
    ...initialVocabProperties,
  },
  [id3]: {
    vocabId: id3,
    blackoutWords: { 17: 22 },
    category: "noun",
    definition: "crown",
    description: "The actor wore a crown on his head.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
    ...initialVocabProperties,
  },
  [id4]: {
    vocabId: id4,
    blackoutWords: { 10: 13 },
    category: "noun",
    definition: "the hat",
    description:
      "Wearing a hat at the beach helps protect your face from sun damage.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",

    ...initialVocabProperties,
  },
  [id5]: {
    vocabId: id5,
    blackoutWords: { 34: 41 },
    category: "noun",
    definition: "the glasses",
    description:
      "Now that I'm older, I need to use glasses for reading more often.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
    ...initialVocabProperties,
  },
  [id6]: {
    vocabId: id6,
    blackoutWords: { 42: 49 },
    category: "noun",
    definition: "t-shirt",
    description:
      "It's a warm day, so I decided to put on a t-shirt instead of a sweater.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
    ...initialVocabProperties,
  },
  [id7]: {
    vocabId: id7,
    blackoutWords: { 4: 9 },
    category: "noun",
    definition: "pants",
    description: "The pants were made of blue denim.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
    ...initialVocabProperties,
  },
};
