import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Converter } from '../../components';
import background from '../../assets/images/lines.png';

const StyledMain = styled.div`
  background: url(${background}),
    linear-gradient(
      180deg,
      hsla(0, 0%, 0%, 1) 24%,
      hsla(352, 78%, 27%, 1) 95%,
      hsla(352, 78%, 29%, 1) 100%
    );

  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 100% 0.1%;
  background-size: cover;

  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1150px) {
    padding: 10px;
  }
`;

const MainPage = () => {
  return (
    <StyledMain>
      <Box
        component="form"
        sx={{
          width: '1100px',
          height: '300px',
          backgroundColor: '#fff',
          margin: '0 auto',
          borderRadius: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <Converter />
      </Box>
    </StyledMain>
  );
};

export default MainPage;
