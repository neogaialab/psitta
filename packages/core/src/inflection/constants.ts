import { NumberDeclensionRule } from "./"

export const DEFAULT_NUMBER_DECLENSION_RULE: NumberDeclensionRule = (
  forms,
  count,
) => {
  return count === 1 ? 0 : forms.length - 1
}
