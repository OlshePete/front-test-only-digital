import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  color: blue;
`;

const App: React.FC = () => {
  return <StyledDiv>Hello, Styled Components!</StyledDiv>;
};

export default App;