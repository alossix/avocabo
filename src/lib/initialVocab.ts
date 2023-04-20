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
        "Portar un barret a la platja ajuda a protegir la cara dels danys solars.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "les ulleres",
      description:
        "Ara que sóc més gran, necessito usar les ulleres per llegir més sovint.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la samarreta",
      description:
        "Fa calor avui, així que he decidit posar-me una samarreta en lloc d'un jersei.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "els pantalons",
      description: "Els pantalons eren de texà blau.",
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
      description:
        "Betrachten Sie die Sonne während einer Sonnenfinsternis niemals.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "der Regen",
      description: "Wir beobachten den Regen während des Sturms.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "die Krone",
      description: "Der Schauspieler trug eine Krone auf dem Kopf.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "der Hut",
      description:
        "Ein Hut am Strand zu tragen hilft, Ihr Gesicht vor Sonnenschäden zu schützen.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "die Brille",
      description:
        "Jetzt, wo ich älter bin, muss ich beim Lesen häufiger eine Brille tragen.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "das T-Shirt",
      description:
        "Es ist ein warmer Tag, also habe ich mich entschieden, ein T-Shirt statt eines Pullovers anzuziehen.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "die Hose",
      description: "Die Hose bestand aus blauem Denim.",
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
      description: "Never look at the sun during an eclipse.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "rain",
      description: "We watch the rain during the storm.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "crown",
      description: "The actor wore a crown on his head.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "the hat",
      description:
        "Wearing a hat at the beach helps protect your face from sun damage.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "the glasses",
      description:
        "Now that I'm older, I need to use glasses for reading more often.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "t-shirt",
      description:
        "It's a warm day, so I decided to put on a t-shirt instead of a sweater.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "pants",
      description: "The pants were made of blue denim.",
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
  ],
  fr: [
    {
      category: "noun",
      definition: "le soleil",
      description: "Ne regardez jamais le soleil pendant une éclipse.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la pluie",
      description: "Nous regardons la pluie pendant l'orage.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la couronne",
      description: "L'acteur portait une couronne sur la tête.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "le chapeau",
      description:
        "Porter un chapeau à la plage aide à protéger votre visage des dommages causés par le soleil.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "les lunettes",
      description:
        "Maintenant que je suis plus âgé, j'ai besoin de porter des lunettes pour lire plus souvent.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "le t-shirt",
      description:
        "Il fait chaud aujourd'hui, alors j'ai décidé de mettre un t-shirt au lieu d'un pull.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "le pantalon",
      description: "Le pantalon était en denim bleu.",
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
      description: "Non guardare mai il sole durante un'eclissi.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la pioggia",
      description: "Guardiamo la pioggia durante la tempesta.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la corona",
      description: "L'attore indossava una corona sulla testa.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "il cappello",
      description:
        "Indossare un cappello in spiaggia aiuta a proteggere il viso dai danni del sole.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "gli occhiali",
      description:
        "Ora che sono più vecchio, ho bisogno di usare gli occhiali per leggere più spesso.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "la maglietta",
      description:
        "Fa caldo oggi, quindi ho deciso di indossare una maglietta invece di un maglione.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "i pantaloni",
      description: "I pantaloni erano in denim blu.",
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
      description:
        "Nu ik ouder ben, moet ik vaker een bril dragen om te lezen.",
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
  ],
  uk: [
    {
      category: "noun",
      definition: "сонце",
      description: "Ніколи не дивіться на сонце під час сонячного затемнення.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/4evzWOXxQyDYNgtmTyF2yYyteYs=/fit-in/1000x1000/photos.production.thenounproject.com/photos/63EA1C09-599C-4DFD-9F12-EB47040C2884.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "дощ",
      description: "Ми спостерігаємо за дощем під час грози.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/CjieXWzlGXymb75rchqIClRsD5Y=/fit-in/1000x1000/photos.production.thenounproject.com/photos/95846160-49C7-4401-A154-EED13B1E3923.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "корона",
      description: "Актор носив корону на голові.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/oHSSI9h3Aj5m9qTK3NK62a-u1Fc=/fit-in/1000x1000/photos.production.thenounproject.com/photos/DEF25567-801B-4D36-BF44-C7B3540EF5A1.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "капелюх",
      description:
        "Носіння капелюха на пляжі допомагає захистити обличчя від ушкоджень сонцем.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/qa4JwusK7y2JSHk6whIyAHhHxI0=/fit-in/1000x1000/photos.production.thenounproject.com/photos/641855D5-463E-4F37-A20F-67122234AEE5.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "окуляри",
      description:
        "Тепер, коли я старію, мені потрібно частіше користуватися окулярами для читання.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/TTe4N-6KQ-RL-M8aoRTaf7n6Ah4=/fit-in/1000x1000/photos.production.thenounproject.com/photos/5C5A10B4-D023-4E2C-BF9F-D201EDEB2F58.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "футболка",
      description:
        "Сьогодні спекотно, тому я вирішив одягнути футболку замість светра.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/WmcBPu-p1IvyuNOa6LjE5XqsWKU=/fit-in/1000x1000/photos.production.thenounproject.com/photos/0761C424-AC55-4F2A-98F0-76471DF8DA14.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
    {
      category: "noun",
      definition: "штани",
      description: "Штани були з синього деніму.",
      imageURL:
        "https://thumbnails.production.thenounproject.com/MC1iYUKYzQ8IaJnXfMI0R1sMSog=/fit-in/1000x1000/photos.production.thenounproject.com/photos/cropped_image_of_tattooed_woman_wearing_crop_top_and_denim_pants-scopio-6d7d618d-_J4520Lp.jpg",
      vocabId: uuid4(),
      ...initialVocabProperties,
    },
  ],
  other: [],
};
