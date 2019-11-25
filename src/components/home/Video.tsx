import styled from '@emotion/styled';
import * as React from 'react';

const StyledVideo = styled.video`
  object-fit: scale-down;
  max-height: 360px;
`;

interface Props {
  readonly src: string;
}

export class Video extends React.Component<Props> {
  public shouldComponentUpdate(nextProps: Props): boolean {
    return this.props.src !== nextProps.src;
  }

  public render() {
    return <StyledVideo src={this.props.src} playsInline autoPlay loop />;
  }
}
