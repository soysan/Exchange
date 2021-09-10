interface ValidateProps {
  isValid: boolean,
  errorMessage: string,
}

type CurrenciesProps = {
  locale: string;
  denomination: string;
  rate: number;
}

export {
  CurrenciesProps,
  ValidateProps,
}
