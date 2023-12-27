'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useCallback, useMemo} from 'react';

type UseRouterParamsOptions = {
  defaultParams?: Record<string, string | string[]>;
};

export const useRouterParams = ({defaultParams = {}}: UseRouterParamsOptions = {}) => {
  const router = useRouter();
  const {pathname, searchParams} = {pathname: usePathname(), searchParams: useSearchParams()!};

  const queryParams = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    Object.keys(defaultParams).forEach((key) => {
      if (!params.get(key)) {
        const value = defaultParams[key];
        if (Array.isArray(value)) {
          params.set(key, value.join('+'));
        } else {
          params.set(key, value);
        }
      }
    });
    return params;
  }, [searchParams, defaultParams]);

  const serialize = useCallback((params: Record<string, string | string[]>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        searchParams.set(key, value.map(encodeURIComponent).join('+'));
      } else {
        searchParams.set(key, encodeURIComponent(value));
      }
    });
    return searchParams.toString();
  }, []);

  const updateQueryParams = useCallback(
    (newParams: Record<string, string | string[]>) => {
      const serializedParams = serialize(newParams);
      router.replace(`${pathname}?${serializedParams}`, {scroll: false});
    },
    [router, pathname, serialize]
  );

  return {queryParams, updateQueryParams};
};
