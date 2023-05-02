import { mockVocabList } from "@/lib/testUtils";
import { AppUser, LearningLanguages } from "@/types/general";
import { render, screen } from "@testing-library/react";
import { ProfilePageView } from "./ProfilePageView";

const currentUser: AppUser = {
  email: "test@example.com",
  emailVerified: true,
  displayName: "MyName",
  uid: "12345-abcde-67890-fghij",
  interfaceLanguage: "en",
  learningLanguage: "ca",
  userCreatedDate: new Date("2023-01-01"),
  userLastSignIn: new Date("2023-01-15"),
};

const languageLabelsLearning = {
  ca: "Català",
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  nl: "Nederlands",
  uk: "Українська",
  other: "common:other",
};

describe("ProfilePageView", () => {
  it("should render the user's display name", () => {
    render(
      <ProfilePageView
        currentUser={currentUser}
        vocabCount={Object.keys(mockVocabList).length}
      />
    );
    expect(screen.getByText(currentUser.displayName ?? "")).toBeInTheDocument();
  });

  it("should render the user's email", () => {
    render(
      <ProfilePageView
        currentUser={currentUser}
        vocabCount={Object.keys(mockVocabList).length}
      />
    );
    expect(screen.getByText(currentUser.email ?? "")).toBeInTheDocument();
  });

  it("should render the total number of vocab items", () => {
    render(
      <ProfilePageView
        currentUser={currentUser}
        vocabCount={Object.keys(mockVocabList).length}
      />
    );
    expect(
      screen.getByText(Object.keys(mockVocabList).length.toString())
    ).toBeInTheDocument();
  });

  it("should render the user's learning language", () => {
    render(
      <ProfilePageView
        currentUser={currentUser}
        vocabCount={Object.keys(mockVocabList).length}
      />
    );
    const expectedLanguageName =
      languageLabelsLearning[currentUser.learningLanguage];
    expect(screen.getByText(expectedLanguageName)).toBeInTheDocument();
  });

  it.each(Object.entries(languageLabelsLearning))(
    "should render the correct learning language name for key %s",
    (learningLanguageKey, expectedLanguageName) => {
      const testUser: AppUser = {
        ...currentUser,
        learningLanguage: learningLanguageKey as LearningLanguages,
      };
      render(
        <ProfilePageView
          currentUser={testUser}
          vocabCount={Object.keys(mockVocabList).length}
        />
      );
      expect(screen.getByText(expectedLanguageName)).toBeInTheDocument();
    }
  );
});
