'use client';

import {useCallback, useMemo, useState, memo} from 'react';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import type {Category} from '@/app/lib/definitions';
import {Box, Button, Checkbox, Divider} from '@mui/material';
import {statusMap, EventStatus, categoryDescription} from '@/app/lib/utils';

function Categories({
  categories = [],
  status = EventStatus.Closed
}: {
  categories?: Category[];
  status?: EventStatus;
}) {
  const {text} = statusMap.get(status) || {text: 'Esgotado'};
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const categoriesParam = searchParams.get('categories') || '';
  const initialSelectedCategories = useMemo(
    () =>
      new Set(
        categoriesParam
          .split('+')
          .filter((name) => name)
          .map((name) => name.toLowerCase())
      ),
    [categoriesParam]
  );

  const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleCheckboxChange = useCallback(
    (categoryName: string) => {
      setSelectedCategories((prevSelectedCategories) => {
        const newSelectedCategories = new Set(prevSelectedCategories);
        const lowerCaseName = categoryName.toLowerCase();

        if (newSelectedCategories.has(lowerCaseName)) {
          newSelectedCategories.delete(lowerCaseName);
        } else {
          newSelectedCategories.add(lowerCaseName);
        }

        router.replace(
          `${pathname}?${createQueryString(
            'categories',
            Array.from(newSelectedCategories).map(encodeURIComponent).join('+')
          )}`,
          {scroll: false}
        );

        return newSelectedCategories;
      });
    },
    [router, pathname, createQueryString]
  );

  return (
    <Box className="bg-white rounded-2xl" sx={{boxShadow: 3}}>
      <div className="flex flex-col p-6 gap-6">
        <h2 className="text-2xl">Categorias</h2>
        <div className="flex flex-col gap-4">
          {categories.map(({name, minimum_age, maximum_age, price}, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex">
                <Checkbox
                  checked={selectedCategories.has(name.toLowerCase())}
                  onChange={() => handleCheckboxChange(name)}
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

export default memo(Categories);
