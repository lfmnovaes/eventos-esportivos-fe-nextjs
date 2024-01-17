'use client';

import {useEffect, useState} from 'react';
import type {CategoryWithPrice} from '@/app/lib/definitions';
import {Box, Button, Checkbox, Divider} from '@mui/material';
import {statusMap, EventStatus, categoryDescription} from '@/app/lib/utils';
import {useRouterParams} from '@/app/lib/useRouterParams';

export default function Categories({
  categories = [],
  status = EventStatus.Closed
}: {
  categories?: CategoryWithPrice[];
  status?: EventStatus;
}) {
  const {text} = statusMap.get(status) || {text: 'Esgotado'};

  const {queryParams, updateQueryParams} = useRouterParams({
    defaultParams: {categories: ''}
  });

  const initialSelectedCategories = new Set(
    (queryParams.get('categories') || '')
      .split('+')
      .filter((id) => id)
      .map(decodeURIComponent)
  );

  const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories);

  useEffect(() => {
    updateQueryParams({categories: Array.from(selectedCategories)});
  }, [selectedCategories, updateQueryParams]);

  const handleCheckboxChange = (categoryId: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      const newSelectedCategories = new Set(prevSelectedCategories);

      if (newSelectedCategories.has(categoryId)) {
        newSelectedCategories.delete(categoryId);
      } else {
        newSelectedCategories.add(categoryId);
      }

      return newSelectedCategories;
    });
  };

  return (
    <Box className="bg-white rounded-2xl" sx={{boxShadow: 3}}>
      <div className="flex flex-col p-6 gap-6">
        <h2 className="text-2xl">Categorias</h2>
        <div className="flex flex-col gap-4">
          {categories.map(({id, name, minimum_age, maximum_age, price}, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex">
                <Checkbox
                  checked={selectedCategories.has(id.toString())}
                  onChange={() => handleCheckboxChange(id.toString())}
                />
                <div>
                  <p>{name}</p>
                  <p className="text-sm">{categoryDescription(minimum_age, maximum_age)}</p>
                </div>
              </div>
              <span>R${price}</span>
            </div>
          ))}
        </div>
      </div>
      <Divider className="bg-gray-200" />
      <div className="flex justify-center p-8">
        {status === EventStatus.Open ? (
          <Button
            variant="contained"
            color="info"
            size="large"
            disabled={selectedCategories.size === 0}
          >
            Realizar inscrição
          </Button>
        ) : (
          <p className="text-lg">{text}</p>
        )}
      </div>
    </Box>
  );
}
