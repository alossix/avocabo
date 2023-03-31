import { User } from "firebase/auth";

export type InterfaceLanguages = "ca" | "en" | "es" | "fr" | "it" | "nl";
export type LearningLanguages = "ca" | "en" | "es" | "fr" | "it" | "nl";

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
