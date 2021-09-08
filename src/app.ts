
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

      const validatorRes = CCTools.ValidateInputCommandArr(cliArr);

      break;
    default:
      return;
  }
};

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

  static ValidateCommandArr = (commandArr: string[]): ValidateProps {
    const validatorRes = CCTools.ValidateUniverse(commandArr);
    if (!validatorRes['isValid']) return validatorRes;
  }

  static ValidateUniverse = (commandArr: string[]): ValidateProps {

  }
}

interface ValidateProps {
  isValid: Boolean,
  errorMessage: string,
}
