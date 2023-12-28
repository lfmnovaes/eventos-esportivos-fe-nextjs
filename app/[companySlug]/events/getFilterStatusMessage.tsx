import type {ReactNode} from 'react';
import {capitalizeFirstLetter} from '@/app/lib/utils';

export function getFilterStatusMessage(
  selectedFederalUnity: string,
  selectedPeriod: string,
  selectedCategory: string,
  searchInput: string
): ReactNode {
  const filters = [
    selectedFederalUnity !== 'all' && (
      <>
        no estado <strong className="text-gray-80">{selectedFederalUnity}</strong>
      </>
    ),
    selectedPeriod !== 'all' && (
      <>
        em <strong className="text-gray-80">{selectedPeriod}</strong>
      </>
    ),
    selectedCategory !== 'all' && (
      <>
        na categoria <strong className="text-gray-80">{capitalizeFirstLetter(selectedCategory)}</strong>
      </>
    ),
    searchInput && (
      <>
        para &quot;<strong className="text-gray-80">{searchInput}</strong>&quot;
      </>
    )
  ].filter(Boolean);

  if (filters.length === 0 || filters === null) {
    return 'Exibindo todos os resultados';
  }

  const combinedFilters = filters.reduce<ReactNode>(
    (acc, curr, index) => (
      <>
        {acc}
        {index > 0 ? ' ' : ''}
        {curr}
      </>
    ),
    <> </>
  );

  return <>Exibindo resultados{combinedFilters}</>;
}
