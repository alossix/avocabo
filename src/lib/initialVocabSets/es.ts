import { Vocab } from "@/types/vocab";
import { v4 as uuid4 } from "uuid";
import { initialVocabProperties } from "../initialVocab";

export const initialVocabSetES: Vocab[] = [
  {
    category: "noun",
    definition: "el sol",
    description: "Nunca mires al sol durante un eclipse.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "la lluvia",
    description: "Miramos la lluvia durante la tormenta.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "la corona",
    description: "El actor llevaba una corona en su cabeza.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "el sombrero",
    description:
      "Usar un sombrero en la playa ayuda a proteger tu rostro del daño solar.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "las gafas",
    description:
      "Ahora que soy mayor, necesito usar gafas para leer con más frecuencia.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "la camiseta",
    description:
      "Hace calor hoy, así que decidí ponerme una camiseta en lugar de un suéter.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    category: "noun",
    definition: "los pantalones",
    description: "Los pantalones eran de mezclilla azul.",
    imageURL:
      "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
];
