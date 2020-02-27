import styled from '@emotion/styled';
import * as React from 'react';

interface Props {
  readonly block?: boolean;
  readonly children: React.ReactNode;
}

const fontFamily: ReadonlyArray<string> = [
  'SFMono-Regular',
  'source-code-pro',
  'Menlo',
  'Monaco',
  'Consolas',
  'Roboto Mono',
  'Droid Sans Mono',
  'Liberation Mono',
  'Consolas',
  'Courier New',
  'Courier',
  'monospace',
];

const StyledCode = styled.code<{ readonly block?: boolean }, { readonly accent?: string }>`
  margin: 0;
  font-family: ${fontFamily.map((value) => `"${value}"`).join(', ')};
  font-weight: 500;
  font-style: normal;
  font-size: 13px;
  line-height: 1rem;
  text-align: left;
  padding: 0.5em;
  overflow-x: auto;
  background: #f0f0f0;
  border-left: ${(props) => (props.block ? `4px solid ${props.theme.accent}` : '')};
`;

const StyledPre = styled.pre`
  margin: 0;
`;

export function Code({ block, children }: Props) {
  const element = <StyledCode block={block}>{children}</StyledCode>;

  return block ? <StyledPre>{element}</StyledPre> : element;
}
