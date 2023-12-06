export const getDomainName = (url: string): string => new URL(url).hostname.replace(/^www\./, '');

export const formatBrazilianPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.length === 13 && phoneNumber.startsWith('+55')
    ? `(${phoneNumber.slice(3, 5)}) ${phoneNumber.slice(5, 9)}-${phoneNumber.slice(9, 13)}`
    : '';

export const splitBigText = (text: string): string[] => text.split('\r\n').filter((e) => e);
