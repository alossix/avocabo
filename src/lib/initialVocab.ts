import { v4 as uuid4 } from "uuid";
const currentDate = new Date().toISOString();

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

import { Vocab } from "@/types/vocab";
import { LearningLanguages } from "@/types/general";

export const initialVocabSet: { [key in LearningLanguages]: Vocab[] } = {
  ca: [
    {
      category: "noun",
      definition: "el sol",
      description: "Mai miris al sol durant un eclipsi.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la pluja",
      description: "Mirem la pluja durant la tempesta.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la corona",
      description: "L'actor portava una corona al cap.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "el barret",
      description:
        "Portar un barret a la platja ajuda a protegir la cara dels danys del sol.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "les ulleres",
      description:
        "Ara que sóc més gran, necessito utilitzar les ulleres per llegir més sovint.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la samarreta",
      description:
        "Fa un dia calorós, així que he decidit posar-me la samarreta en lloc d'un jersei.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "els pantalons",
      description: "Els pantalons estaven fets de teixit blau denim.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
  ],
  de: [
    {
      category: "noun",
      definition: "die Sonne",
      description: "Schaue niemals während einer Sonnenfinsternis auf die ___.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "der Regen",
      description: "Wir beobachten den ____ während des Sturms.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "die Krone",
      description: "Der Schauspieler trug eine _____ auf seinem Kopf.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "der Hut",
      description:
        "Einen ___ am Strand zu tragen, hilft, das Gesicht vor Sonnenschäden zu schützen.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "die Brille",
      description:
        "Jetzt, wo ich älter bin, muss ich zum Lesen häufiger _______ verwenden.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "das T-Shirt",
      description:
        "Es ist ein warmer Tag, also habe ich mich entschieden, ein _______ anstelle eines Pullovers anzuziehen.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "die Hose",
      description: "Die _____ bestanden aus blauem Denim-Stoff.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
  ],
  en: [
    {
      category: "noun",
      definition: "sun",
      description: "Never look at the ___ during an eclipse.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "rain",
      description: "We watch the ____ during the storm.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "crown",
      description: "The actor wore a _____ on his head.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "the hat",
      description:
        "Wearing a ___ at the beach helps protect your face from sun damage.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "the glasses",
      description:
        "Now that I'm older, I need to use _______ for reading more often.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "t-shirt",
      description:
        "It's a warm day, so I decided to put on a _______ instead of a sweater.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "pants",
      description: "The _____ were made of blue denim.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
  ],
  es: [
    {
      category: "noun",
      definition: "el sol",
      description: "Nunca mires al ___ durante un eclipse.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la lluvia",
      description: "Miramos la ____ durante la tormenta.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la corona",
      description: "El actor llevaba una _____ en la cabeza.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "el sombrero",
      description:
        "Llevar un ___ en la playa ayuda a proteger la cara del daño solar.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "las gafas",
      description:
        "Ahora que soy mayor, necesito usar _______ para leer más a menudo.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la camiseta",
      description:
        "Hace un día cálido, así que decidí ponerme una _______ en lugar de un suéter.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "los pantalones",
      description: "Los _____ estaban hechos de tela vaquera azul.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
  ],
  fr: [
    {
      category: "noun",
      definition: "le soleil",
      description: "Ne regardez jamais le ___ pendant une éclipse.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la pluie",
      description: "Nous regardons la ____ pendant la tempête.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la couronne",
      description: "L'acteur portait une _____ sur la tête.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "le chapeau",
      description:
        "Porter un ___ à la plage aide à protéger votre visage des dommages causés par le soleil.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "les lunettes",
      description:
        "Maintenant que je suis plus âgé, j'ai besoin d'utiliser _______ pour lire plus souvent.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "le t-shirt",
      description:
        "Il fait chaud aujourd'hui, alors j'ai décidé de mettre un _______ au lieu d'un pull.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "le pantalon",
      description: "Le _____ était en denim bleu.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
  ],
  it: [
    {
      category: "noun",
      definition: "il sole",
      description: "Non guardare mai il ___ durante un'eclissi.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la pioggia",
      description: "Guardiamo la ____ durante la tempesta.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la corona",
      description: "L'attore indossava una _____ sulla testa.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "il cappello",
      description:
        "Indossare un ___ in spiaggia aiuta a proteggere il viso dai danni del sole.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "gli occhiali",
      description:
        "Ora che sono più vecchio, ho bisogno di usare _______ per leggere più spesso.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la maglietta",
      description:
        "Fa caldo oggi, quindi ho deciso di indossare una _______ invece di un maglione.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "i pantaloni",
      description: "I _____ erano fatti di tessuto denim blu.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
  ],
  nl: [
    {
      category: "noun",
      definition: "de zon",
      description: "Kijk nooit naar de ___ tijdens een eclips.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "de regen",
      description: "We kijken naar de ____ tijdens de storm.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "de kroon",
      description: "De acteur droeg een _____ op zijn hoofd.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "de hoed",
      description:
        "Een ___ dragen op het strand helpt je gezicht te beschermen tegen zonneschade.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "de bril",
      description:
        "Nu ik ouder ben, moet ik vaker _______ gebruiken om te lezen.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "het T-shirt",
      description:
        "Het is een warme dag, dus besloot ik een _______ aan te trekken in plaats van een trui.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "de broek",
      description: "De _____ waren gemaakt van blauw denim stof.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
  ],
  uk: [
    {
      category: "noun",
      definition: "сонце",
      description: "Ніколи не дивіться на ___ під час сонячного затемнення.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "дощ",
      description: "Ми спостерігаємо за ____ під час бурі.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "корона",
      description: "Актор носив _____ на голові.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "капелюх",
      description:
        "Носіння ___ на пляжі допомагає захистити обличчя від ушкоджень сонцем.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "окуляри",
      description:
        "Тепер, коли я став старшим, мені потрібно використовувати _______ для читання частіше.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "футболка",
      description:
        "Це теплий день, тому я вирішив одягнути _______ замість светра.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "штани",
      description: "_____ були зроблені з синього деніму.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
  ],
  other: [],
};
