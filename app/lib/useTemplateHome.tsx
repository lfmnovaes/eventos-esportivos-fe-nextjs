'use client';

import useSWR from 'swr';

const fetcher = (...args: Parameters<typeof fetch>): Promise<any> =>
  fetch(...args).then((res) => res.json());

// Not being used atm
export default function useTemplateHome() {
  // TODO: Use props for id and section
  const publicApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/2/template_home`;
  const publicProxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
  const isDevelopment = process.env.NODE_ENV === 'development';

  const url = isDevelopment ? `${publicProxyUrl}${publicApiUrl}` : publicApiUrl;
  const {data, error, isLoading} = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading
  };
}
