import { CurrenciesProps, ValidateProps } from './types';

const OutputResult = <HTMLElement>document.querySelectorAll("#outputResult")[0];
const InputCommand = <HTMLInputElement>document.querySelectorAll('#inputCommand')[0];


InputCommand.addEventListener('keyup', (e: KeyboardEvent) => SubmitSearch(e))

const SubmitSearch = async (e: KeyboardEvent) => {
  const p = document.createElement('p');
  switch (e.code) {
    case 'ArrowUp':
      InputCommand.value = CCTools.count > 0 ? CCTools.record[--CCTools.count] : '';
      OutputResult.append(p);
      break;
    case 'ArrowDown':
      InputCommand.value = CCTools.count > 0 ? CCTools.record[++CCTools.count] : '';
      OutputResult.append(p);
      break;
    case 'Enter':
      const cliArr = CCTools.ToArrCommand(InputCommand.value);

      CCTools.EchoParagraph(OutputResult);
      CCTools.AddCommandAtRecord(InputCommand.value);
      InputCommand.value = '';

      const validatorRes = CCTools.ValidateCommandArr(cliArr);

      break;
    default:
      return;
  }
};

const currenciesData: CurrenciesProps[] = [
  {
    locale: 'India',
    denomination: 'Rupee',
    rate: 1.4442,
  },
  {
    locale: 'India',
    denomination: 'Paisa',
    rate: 0.014442,
  },
  {
    locale: 'USA',
    denomination: 'Dollar',
    rate: 106.10,
  },
  {
    locale: 'USA',
    denomination: 'USCent',
    rate: 1.0610,
  },
  {
    locale: 'Europe',
    denomination: 'Euro',
    rate: 125.56,
  },
  {
    locale: 'Europe',
    denomination: 'EuroCent',
    rate: 1.2556,
  },
  {
    locale: 'UAE',
    denomination: 'Dirham',
    rate: 28.89,
  },
  {
    locale: 'UAE',
    denomination: 'Fils',
    rate: 0.2889,
  },
];

class CCTools {
  static record: { [key: number]: string } = {};
  static count = 0;

  static ToArrCommand = (command: string): string[] => {
    const inputArr = command.trim().split(' ');
    return inputArr;
  }

  static EchoParagraph = (parentDiv: HTMLElement): void => {
    parentDiv.innerHTML +=
      `
      <p>
      <span class='os'>student</span>
      <span class='at'>@</span>
      <span class='na'>recursionist</span>
      : ${InputCommand.value}
      </p>
      `;
    return;
  }

  static AddCommandAtRecord = (command: string): void => {
    CCTools.record[CCTools.count++] = command;
  }

  static ValidateCommandArr = (commandArr: string[]): ValidateProps => {
    const validatorRes = CCTools.ValidateUniverse(commandArr);
    if (!validatorRes['isValid']) return validatorRes;
    return validatorRes;
  }

  static ValidateUniverse = (commandArr: string[]): ValidateProps => {
    const validCommandList: string[] = ['convert', 'showDominations', 'showAvailableLocales'];
    if (commandArr[0] !== 'ct') {
      return { 'isValid': false, 'errorMessage': `only ct package supported by this app. input must start with 'ct'` };
    }
    if (validCommandList.indexOf(commandArr[1]) == -1) {
      return { 'isValid': false, 'errorMessage': `ct only supports the following commands: ${validCommandList.join(',')}` };
    }
    if (commandArr[1] == 'convert') return CCTools.ValidateConvert(commandArr);
    if (commandArr[1] == 'showDominations') return CCTools.ValidateDominations(commandArr);
    if (commandArr[1] == 'showAvailableLocales') return CCTools.ValidateLocales(commandArr);
    return { 'isValid': true, 'errorMessage': '' };
  }

  static ValidateConvert = (commandArr: string[]): ValidateProps => {
    const dominations = CCTools.getAllDominations();

    if (commandArr.length !== 5) return { 'isValid': false, 'errorMessage': `command ${commandArr[1]} requires exactly 3 arguments [sourceDenomination] [sourceAmount] [destinationDenomination]` };
    if (dominations.indexOf(commandArr[2]) == -1) return { 'isValid': false, 'errorMessage': `${commandArr[2]} is not acceptable. please choose from ${dominations.forEach(val => val)}` };
    if (isNaN(Number(commandArr[3]))) return { 'isValid': false, 'errorMessage': `${commandArr[3]} is not number. please type number Amount` };
    if (dominations.indexOf(commandArr[4]) == - 1) return { 'isValid': false, 'errorMessage': `${commandArr[4]} is not acceptable. please choose from ${dominations.forEach(val => val)}` };
    return { 'isValid': true, 'errorMessage': '' };
  }

  static getAllDominations = (): string[] => {
    let dominations = [];
    for (let i of currenciesData) {
      dominations.push(i.denomination);
    }
    return dominations;
  }

  static ValidateDominations = (commandArr: string[]): ValidateProps => {
    const locales = CCTools.getAllLocales();

    if (commandArr.length > 3) return { 'isValid': false, 'errorMessage': `command ${commandArr[1]} requires exactly 1 argument` };
    if (commandArr.length === 2) return { 'isValid': false, 'errorMessage': `command ${commandArr[1]} requires [locale]` };
    if (locales.indexOf(commandArr[2]) == -1) return { 'isValid': false, 'errorMessage': `${commandArr[2]} is out of support locale. see the available locales [showAvailableLocales]` };

    return { 'isValid': true, 'errorMessage': '' };
  }

  static getAllLocales = (): string[] => {
    let allLocales = [];
    for (let i of currenciesData) {
      allLocales.push(i.locale);
    }
    const setLocales = new Set(allLocales);
    return Array.from(setLocales);
  }

  static ValidateLocales = (commandArr: string[]): ValidateProps => {
    if (commandArr.length > 2) return { 'isValid': false, 'errorMessage': `command ${commandArr[1]} requires no argument` };
    return { 'isValid': true, 'errorMessage': '' };
  }
}
