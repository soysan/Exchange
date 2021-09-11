"use strict";
// import { CurrenciesProps, ValidateProps } from './types';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const OutputResult = document.querySelectorAll("#outputResult")[0];
const InputCommand = document.querySelectorAll('#inputCommand')[0];
InputCommand.addEventListener('keyup', (e) => SubmitSearch(e));
const SubmitSearch = (e) => __awaiter(void 0, void 0, void 0, function* () {
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
            console.log('valid');
            if (!validatorRes['isValid'])
                CCTools.OutputResultParagraph(OutputResult, false, validatorRes['errorMessage']);
            else
                CCTools.OutputResultParagraph(OutputResult, true, CCTools.EvaluatedResult(cliArr));
            OutputResult.scrollTop = OutputResult.scrollHeight;
            break;
        default:
            return;
    }
});
const currenciesData = [
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
}
CCTools.record = {};
CCTools.count = 0;
CCTools.ToArrCommand = (command) => {
    const inputArr = command.trim().split(' ');
    return inputArr;
};
CCTools.EchoParagraph = (parentDiv) => {
    parentDiv.innerHTML +=
        `
      <p>
      <span class='os'>User</span>
      <span class='at'>@</span>
      <span class='na'>tools</span>
      : ${InputCommand.value}
      </p>
      `;
    return;
};
CCTools.AddCommandAtRecord = (command) => {
    CCTools.record[CCTools.count++] = command;
};
CCTools.ValidateCommandArr = (commandArr) => {
    const validatorRes = CCTools.ValidateUniverse(commandArr);
    if (!validatorRes['isValid'])
        return validatorRes;
    return validatorRes;
};
CCTools.ValidateUniverse = (commandArr) => {
    const validCommandList = ['convert', 'showDominations', 'showAvailableLocales'];
    if (commandArr[0] !== 'ct') {
        return { 'isValid': false, 'errorMessage': `only ct package supported by this app. input must start with 'ct'` };
    }
    if (validCommandList.indexOf(commandArr[1]) == -1) {
        return { 'isValid': false, 'errorMessage': `ct only supports the following commands: ${validCommandList.join(',')}` };
    }
    if (commandArr[1] == 'convert')
        return CCTools.ValidateConvert(commandArr);
    if (commandArr[1] == 'showDominations')
        return CCTools.ValidateDominations(commandArr);
    if (commandArr[1] == 'showAvailableLocales')
        return CCTools.ValidateLocales(commandArr);
    return { 'isValid': true, 'errorMessage': '' };
};
CCTools.ValidateConvert = (commandArr) => {
    const dominations = CCTools.getAllDominations();
    if (commandArr.length !== 5)
        return { 'isValid': false, 'errorMessage': `command ${commandArr[1]} requires exactly 3 arguments [sourceDenomination] [sourceAmount] [destinationDenomination]` };
    if (dominations.indexOf(commandArr[2]) == -1)
        return { 'isValid': false, 'errorMessage': `${commandArr[2]} is not acceptable. please choose from ${dominations.forEach(val => val)}` };
    if (isNaN(Number(commandArr[3])))
        return { 'isValid': false, 'errorMessage': `${commandArr[3]} is not number. please type number Amount` };
    if (dominations.indexOf(commandArr[4]) == -1)
        return { 'isValid': false, 'errorMessage': `${commandArr[4]} is not acceptable. please choose from ${dominations.forEach(val => val)}` };
    return { 'isValid': true, 'errorMessage': '' };
};
CCTools.getAllDominations = () => {
    let dominations = [];
    for (let i of currenciesData) {
        dominations.push(i.denomination);
    }
    return dominations;
};
CCTools.ValidateDominations = (commandArr) => {
    const locales = CCTools.getAllLocales();
    if (commandArr.length > 3)
        return { 'isValid': false, 'errorMessage': `command ${commandArr[1]} requires exactly 1 argument` };
    if (commandArr.length === 2)
        return { 'isValid': false, 'errorMessage': `command ${commandArr[1]} requires [locale]` };
    if (locales.indexOf(commandArr[2]) == -1)
        return { 'isValid': false, 'errorMessage': `${commandArr[2]} is out of support locale. see the available locales [showAvailableLocales]` };
    return { 'isValid': true, 'errorMessage': '' };
};
CCTools.getAllLocales = () => {
    let allLocales = [];
    for (let i of currenciesData) {
        allLocales.push(i.locale);
    }
    const setLocales = new Set(allLocales);
    return Array.from(setLocales);
};
CCTools.ValidateLocales = (commandArr) => {
    if (commandArr.length > 2)
        return { 'isValid': false, 'errorMessage': `command ${commandArr[1]} requires no argument` };
    return { 'isValid': true, 'errorMessage': '' };
};
CCTools.OutputResultParagraph = (outputDiv, isValid, resultString) => {
    let name = "";
    let color = "";
    if (isValid) {
        name = "CCTools";
        color = "#73AE98";
    }
    else {
        name = "CCTools Error";
        color = "#FD4821";
    }
    outputDiv.innerHTML +=
        `
      <p>
        <span style='color: ${color}'>${name}</span>: ${resultString}
      </p>
      `;
    return;
};
CCTools.EvaluatedResult = (commandArr) => {
    switch (commandArr[1]) {
        case 'convert':
            return CCTools.Convert(commandArr);
        case 'showDominations':
            return CCTools.ShowDominations(commandArr[2]);
        default:
            return CCTools.ShowLocations();
    }
};
CCTools.Convert = (commandArr) => {
    let sourceRate;
    let destinationRate;
    currenciesData.forEach(curr => {
        if (curr.denomination == commandArr[2])
            sourceRate = curr.rate;
        if (curr.denomination == commandArr[4])
            destinationRate = curr.rate;
    });
    const calcAmount = Math.floor((sourceRate * Number(commandArr[3])) * 100 / destinationRate) / 100;
    return `${commandArr[3]} ${commandArr[2]} => ${calcAmount} ${commandArr[4]}`;
};
CCTools.ShowDominations = (locale) => {
    let res = '';
    currenciesData.forEach(curr => {
        if (curr.locale === locale)
            res += curr.denomination + ' ';
    });
    return res.trimRight();
};
CCTools.ShowLocations = () => {
    let locales = CCTools.getAllLocales();
    let res = '';
    locales.forEach(locale => res += locale + ' ');
    return res;
};
//# sourceMappingURL=app.js.map