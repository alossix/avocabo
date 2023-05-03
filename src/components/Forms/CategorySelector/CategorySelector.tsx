import { theme } from "@/styles/theme";
import { VocabCategories } from "@/types/vocab";
import useTranslation from "next-translate/useTranslation";
import { UseFormRegisterReturn } from "react-hook-form";

type CategorySelectorProps = {
  currentCategory: VocabCategories;
  onCategoryChange: (value: VocabCategories) => void;
  register: UseFormRegisterReturn<string>;
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  currentCategory = "",
  onCategoryChange,
  register,
}) => {
  const { t } = useTranslation("vocab");

  return (
    <>
      <label htmlFor="category" style={{ visibility: "hidden", height: 1 }}>
        {t("vocab:category")}
      </label>
      <select
        id="category"
        value={currentCategory}
        {...register}
        onChange={(e) => {
          const selectedCategory = e.target.value as VocabCategories;
          onCategoryChange(selectedCategory);
        }}
        style={{
          padding: 5.5,
          border: `1px solid ${theme.colors.mediumGrey}`,
          borderRadius: 4,
          color: theme.colors.lightBlack,
        }}
      >
        <option value="category">{t("vocab:category")}</option>
        <option value="adverb">{t("vocab:vocab_category_adverb")}</option>
        <option value="adjective">{t("vocab:vocab_category_adjective")}</option>
        <option value="conjunction">
          {t("vocab:vocab_category_conjunction")}
        </option>
        <option value="noun">{t("vocab:vocab_category_noun")}</option>
        <option value="phrase">{t("vocab:vocab_category_phrase")}</option>
        <option value="preposition">
          {t("vocab:vocab_category_preposition")}
        </option>
        <option value="pronoun">{t("vocab:vocab_category_pronoun")}</option>
        <option value="verb">{t("vocab:vocab_category_verb")}</option>
        <option value="other">{t("vocab:vocab_category_other")}</option>
      </select>
    </>
  );
};
