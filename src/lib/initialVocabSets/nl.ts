import { Vocab } from "@/types/vocab";
import { v4 as uuid4 } from "uuid";
import { initialVocabProperties } from "../initialVocab";

export const initialVocabSetNL: Vocab[] = [
  {
    category: "noun",
    definition: "de zon",
    description: "Kijk nooit naar de zon tijdens een zonsverduistering.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "de regen",
    description: "We kijken naar de regen tijdens de storm.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "de kroon",
    description: "De acteur droeg een kroon op zijn hoofd.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "de hoed",
    description:
      "Een hoed dragen op het strand helpt je gezicht te beschermen tegen zonneschade.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "de bril",
    description: "Nu ik ouder ben, moet ik vaker een bril dragen om te lezen.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "het T-shirt",
    description:
      "Het is een warme dag, dus ik heb besloten om een T-shirt aan te trekken in plaats van een trui.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "de broek",
    description: "De broek was van blauw denim.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
];
