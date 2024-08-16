import { useEffect, useState } from 'react';
import { headerCurrency } from '../../helpers/axios';
import { CurrencyBox } from '../CurrencyBox';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import CircularProgress from '@mui/material/CircularProgress';

const Header = () => {
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    setLoading(true);
    headerCurrency
      .get(`/p24api/pubinfo?exchange&coursid=5`)
      .then((data) => {
        setCurrencies(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', padding: '10px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CurrencyExchangeRoundedIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.0.5rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Currency Converter App
          </Typography>
          <Container maxWidth="md">
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              'Sorry, failed to load exchange rate info. Try again later.'
            ) : (
              <CurrencyBox currencies={currencies} />
            )}
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
