import styled from 'styled-components';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs};
`;

interface LanguageButtonProps {
  $active: boolean;
}

const LanguageButton = styled.button<LanguageButtonProps>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? '#ffffff' : theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primaryHover : theme.colors.surfaceHover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '40'};
  }
`;

const LanguageFlag = styled.span`
  font-size: 1.2rem;
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  ];

  return (
    <SwitcherContainer>
      {languages.map((lang) => (
        <LanguageButton
          key={lang.code}
          $active={language === lang.code}
          onClick={() => setLanguage(lang.code)}
          aria-label={`Switch to ${lang.label}`}
        >
          <LanguageFlag>{lang.flag}</LanguageFlag>
          {lang.label}
        </LanguageButton>
      ))}
    </SwitcherContainer>
  );
};
