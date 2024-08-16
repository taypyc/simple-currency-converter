import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '10px',
  width: '200px',
  color: '#fff',
  backgroundColor: '#000',
}));

const CurrencyBox = ({ currencies }) => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      {currencies.map((object) => (
        <Item key={object.ccy}>
          {object.ccy}/{object.base_ccy}: <br />
          Buy: {object.buy} / Sell: {object.sale}
        </Item>
      ))}
    </Stack>
  );
};

CurrencyBox.propTypes = {
  currencies: PropTypes.array.isRequired,
};

export default CurrencyBox;
