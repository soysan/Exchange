"use strict";
let record = {};
let count = 0;
const OutputResult = document.querySelectorAll("#outputResult")[0];
const InputCommand = document.querySelectorAll('#inputCommand')[0];
InputCommand.addEventListener('keyup', (e) => SubmitSearch(e));
const SubmitSearch = async (e) => {
    const p = document.createElement('p');
    switch (e.code) {
        case 'ArrowUp':
            InputCommand.value = count > 0 ? record[--count] : '';
            OutputResult.append(p);
            break;
        case 'ArrowDown':
            InputCommand.value = count > 0 ? record[++count] : '';
            OutputResult.append(p);
            break;
        case 'Enter':
            console.log(CCTools.ToArrCommand(InputCommand.value));
            record[count++] = InputCommand.value;
            p.innerHTML = `<span class='os'>student</span><span class='at'>@</span><span class='na'>recursionist</span>: ${InputCommand.value}`;
            OutputResult.append(p);
            InputCommand.value = '';
            break;
    }
};
class CCTools {
}
CCTools.ToArrCommand = (command) => {
    const inputArr = command.trim().split(' ');
    return inputArr;
};
//# sourceMappingURL=app.js.map