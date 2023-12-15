// https://nextjs.org/docs/pages/building-your-application/routing/custom-app
// https://mui.com/material-ui/guides/nextjs/

import type {DocumentProps} from 'next/document';
import {Html, Head, Main, NextScript} from 'next/document';
import type {DocumentHeadTagsProps} from '@mui/material-nextjs/v14-pagesRouter';
import {DocumentHeadTags, documentGetInitialProps} from '@mui/material-nextjs/v14-pagesRouter';

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = documentGetInitialProps;
