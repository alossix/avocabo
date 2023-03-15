import { User } from "firebase/auth";

export type InterfaceLanguages = "ct" | "en" | "es" | "it" | "nl";
export type LearningLanguages = "ct" | "en" | "es" | "it" | "nl";

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
