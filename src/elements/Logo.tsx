import styled from '@emotion/styled';
import { Image } from '@neo-one/react-core';
import React from 'react';
import logo from '../../root/img/logo.svg';
import { ComponentProps } from '../types';

const StyledImage = styled(Image)`
  height: 56px;
`;

export const Logo = (props: ComponentProps<typeof Image>) => {
  const { ref: _ref, ...newProps } = props;

  return <StyledImage src={logo} alt="NEO•ONE" {...newProps} />;
};
