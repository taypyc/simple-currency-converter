import { useState, useEffect } from 'react';
import { сurrencyConverter } from '../../helpers/axios';
import { CurrenciesList } from '../CurrenciesList';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const StyledConventer = styled.div`
  width: 90%;
  height: 150px;
  bacground-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid gray;
  border-radius: 30px;

  @media (max-width: 950px) {
    border: none;
  }
`;

const key = 'e23b448847de525effe2906816e83166160f12dc';

const Converter = () => {
  const data = {
    rates: {
      USD: {
        rate_for_amount: '1',
      },
      EUR: {
        rate_for_amount: '1',
      },
      UAH: {
        rate_for_amount: '1',
      },
      RUB: {
        rate_for_amount: '1',
      },
      MXN: {
        rate_for_amount: '1',
      },
      AED: {
        rate_for_amount: '1',
      },
      CAD: {
        rate_for_amount: '1',
      },
      KZT: {
        rate_for_amount: '1',
      },
      MDL: {
        rate_for_amount: '1',
      },
    },
  };

  const [selectedValueFrom, setSelectedValueFrom] = useState(0);
  const [selectedValueTo, setSelectedValueTo] = useState(0);

  const [selectedCurrFrom, setSelectedCurrFrom] = useState('USD');
  const [selectedCurrTo, setSelectedCurrTo] = useState('USD');

  const [valueFromCurrency, setValueFromCurrency] = useState(true);

  const [mainCurrencies, setMainCurrencies] = useState(data);

  const [error, setError] = useState();

  let from;
  let to;
  let amount;

  if (valueFromCurrency) {
    from = selectedCurrFrom;
    to = selectedCurrTo;
    amount = selectedValueFrom;
  } else {
    from = selectedCurrTo;
    to = selectedCurrFrom;
    amount = selectedValueTo;
  }

  useEffect(() => {
    if (selectedValueFrom != null || selectedValueTo != null) {
      сurrencyConverter
        .get(
          `/v2/currency/convert?api_key=${key}&from=${from}&to=${to}&amount=${amount}&format=json`,
        )
        .then((data) => {
          setMainCurrencies(data);
        })
        .catch((err) => {
          setError(err);
          console.log(error);
        });
      if (valueFromCurrency) {
        setSelectedValueTo(mainCurrencies?.rates[to]?.rate_for_amount);
      } else {
        setSelectedValueFrom(mainCurrencies?.rates[to]?.rate_for_amount);
      }
    }
  }, [
    selectedValueFrom,
    selectedValueTo,
    amount,
    from,
    to,
    valueFromCurrency,
    mainCurrencies?.rates,
    error,
  ]);

  let handleValueFromChange = (event) => {
    setSelectedValueFrom(event.target.value);
    setValueFromCurrency(true);
  };

  let handleValueToChange = (event) => {
    setSelectedValueTo(event.target.value);
    setValueFromCurrency(false);
  };

  let handleCurrFromChange = (event) => {
    setSelectedCurrFrom(event.target.value);
    setValueFromCurrency(true);
  };

  let handleCurrToChange = (event) => {
    setSelectedCurrTo(event.target.value);
    setValueFromCurrency(false);
  };

  return (
    <StyledConventer>
      <div>
        <TextField
          id="valueFrom"
          label="You send"
          value={selectedValueFrom}
          onChange={handleValueFromChange}
        />
        <TextField
          id="outlined-select-currency-native"
          select
          onChange={handleCurrFromChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your currency"
        >
          {CurrenciesList.map((object) => (
            <option key={object.id} value={object.value}>
              {object.label}
            </option>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          id="valueTo"
          label="You get"
          value={selectedValueTo}
          onChange={handleValueToChange}
        />
        <TextField
          id="outlined-select-currency-native"
          select
          onChange={handleCurrToChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your currency"
        >
          {CurrenciesList.map((object) => (
            <option key={object.id} value={object.value}>
              {object.label}
            </option>
          ))}
        </TextField>
      </div>
    </StyledConventer>
  );
};

export default Converter;
