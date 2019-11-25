import styled from '@emotion/styled';
import { H3 } from '@neo-one/react-core';
import { prop } from 'styled-tools';

export type GridJustifySelf = 'start' | 'end' | 'center' | 'stretch';
export type GridAlignSelf = GridJustifySelf;

export const Headline = styled(H3)<{ readonly alignSelf?: GridAlignSelf; readonly justifySelf?: GridJustifySelf }, {}>`
  ${prop('theme.fonts.axiformaRegular')};
  align-self: ${prop('alignSelf')};
  justify-self: ${prop('justifySelf')};
  ${prop('theme.fontStyles.headline')};
  margin: 0;
`;
