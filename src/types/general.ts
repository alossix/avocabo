import { User } from "firebase/auth";

export type InterfaceLanguages =
  | "ca"
  | "de"
  | "en"
  | "es"
  | "fr"
  | "it"
  | "nl"
  | "uk";
export type LearningLanguages =
  | "ca"
  | "de"
  | "en"
  | "es"
  | "fr"
  | "it"
  | "nl"
  | "uk"
  | "other";

export type AppUser = Pick<
  User,
  "email" | "displayName" | "uid" | "emailVerified"
> & {
  firstName?: string;
  interfaceLanguage: InterfaceLanguages;
  learningLanguage: LearningLanguages;
  lastName?: string;
  userCreatedDate: Date;
  userLastSignIn: Date;
};
