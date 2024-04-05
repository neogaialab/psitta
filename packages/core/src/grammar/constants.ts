import { InflectionRule } from "."

export const FORMS_PATTERN = /\(([^)]+)\)/;

export const DEFAULT_NUMBER_INFLECTION_RULE: InflectionRule<number> = (
  forms,
  count,
) => {
  return count === 1 ? 0 : forms.length - 1
}

export const DEFAULT_GENDER_INFLECTION_RULE: InflectionRule<string> = (
  forms,
  gender,
) => {
  return gender === "masc" ? 0 : forms.length - 1
}

export const DUMMY_INFLECT = () => ''
