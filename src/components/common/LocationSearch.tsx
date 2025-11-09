import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { searchLocation, getLocationName } from '@/services/geocoding';
import type { GeocodingResult } from '@/types';
import { Input, Label, FormGroup } from './Input';

const SearchContainer = styled.div`
  position: relative;
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing.xs};
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SearchResult = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const ResultName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ResultAddress = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoadingText = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NoResults = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface LocationSearchProps {
  onLocationSelect: (result: GeocodingResult) => void;
  placeholder?: string;
  label?: string;
}

export const LocationSearch = ({
  onLocationSelect,
  placeholder = 'Search for a city...',
  label = 'Search Location',
}: LocationSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchDebounced = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      const searchResults = await searchLocation(query);
      setResults(searchResults);
      setShowResults(true);
      setLoading(false);
    }, 300);

    return () => clearTimeout(searchDebounced);
  }, [query]);

  const handleSelect = (result: GeocodingResult) => {
    onLocationSelect(result);
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <FormGroup>
      <Label>{label}</Label>
      <SearchContainer ref={searchRef}>
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
        />

        {showResults && (
          <SearchResults>
            {loading && <LoadingText>Searching...</LoadingText>}

            {!loading && results.length === 0 && query.trim().length >= 2 && (
              <NoResults>No locations found</NoResults>
            )}

            {!loading &&
              results.map((result) => (
                <SearchResult
                  key={result.place_id}
                  onClick={() => handleSelect(result)}
                  type="button"
                >
                  <ResultName>{getLocationName(result)}</ResultName>
                  <ResultAddress>{result.display_name}</ResultAddress>
                </SearchResult>
              ))}
          </SearchResults>
        )}
      </SearchContainer>
    </FormGroup>
  );
};
