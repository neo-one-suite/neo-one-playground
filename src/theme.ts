import { theme as oneTheme } from '@neo-one/react';
import { css, injectGlobal } from 'reakit';

// tslint:disable-next-line no-unused-expression
injectGlobal`
  body {
    margin: 0;
    text-rendering: optimizeLegibility;
  }
`;

export const theme = {
  ...oneTheme,
  maxWidth: css`
    max-width: 1132px;
  `,
};
