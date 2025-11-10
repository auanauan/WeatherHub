import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Simple string replacement for dynamic values
 * Example: replace("Hello {{name}}", { name: "World" }) => "Hello World"
 */
const interpolate = (str: string, values: Record<string, string | number>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return String(values[key] ?? `{{${key}}}`);
  });
};

/**
 * Hook for using translations with dynamic value support
 */
export const useTranslation = () => {
  const { t, language } = useLanguage();

  /**
   * Translate with dynamic values
   * @param text - Translation text (can include {{key}} placeholders)
   * @param values - Object with values to replace
   */
  const translate = (text: string, values?: Record<string, string | number>): string => {
    if (!values) return text;
    return interpolate(text, values);
  };

  return {
    t,
    translate,
    language,
  };
};
