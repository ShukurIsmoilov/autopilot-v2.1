let carLocation = 0;
const reCommands = /car\.(forward|backwards|right|left)\((|[0-9])\);/;
const squaresArray = document.querySelector('#map').querySelectorAll('div');
const codeLine = document.querySelector('#codeLine');
const runButton = document.querySelector('#run-btn');

codeLine.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        readCommand();
    }
});

document.addEventListener('keydown', (e) => {
    let coeff = 0;
    switch (e.key) {
        case 'ArrowUp':
            coeff = 4;
            codeLine.value = 'car.forward();';
            break;
        case 'ArrowDown':
            coeff = -4;
            codeLine.value = 'car.backwards();';
            break;
        case 'ArrowLeft':
            coeff = -1;
            codeLine.value = 'car.left();';
            break;
        case 'ArrowRight':
            coeff = 1;
            codeLine.value = 'car.right();';
            break;
        default:
            break;
    }
    checkWayAndMove(coeff);
});

const checkWayAndMove = (coeff, steps = 1) => {
    let pathIsClear = true;
    let newPosition = 0;
    for (let i = 1; i <= steps; i++) {
        newPosition = i * coeff + carLocation;
        if (newPosition === 8 ||
            newPosition === 9 ||
            newPosition === 11
        ) pathIsClear = false;
    }
    const moveStep = steps * coeff + carLocation;
    if (!(moveStep > 15 ||
        moveStep < 0 ||
        Math.abs(coeff) === 1 &&
        Math.floor(carLocation / 4) !== Math.floor(moveStep / 4)) &&
        pathIsClear
    ) {
        codeLine.classList.remove('wrong-command');
        squaresArray[carLocation].classList.remove('car');
        carLocation += coeff * steps;
        squaresArray[carLocation].classList.add('car');

        if (carLocation === 12) {
            alert('🎉🏁🎌Hooorray!🎉🏁🎌');
            location.reload();
        }
    }
}

const readCommand = () => {
    const command = codeLine.value.trim();
    const found = command.match(reCommands);

    if (found !== null && found[0] === found.input) {
        const arrayOfChars = found.input.split('',);
        const direction = found[1];
        let steps = +arrayOfChars[arrayOfChars.length - 3];
        if (steps !== 0) {
            if (isNaN(steps)) {
                steps = 1;
            }
            if (steps > 3) {
                codeLine.classList.remove('wrong-command');
                alert('Error, Out of range move. Too big step!');
            } else {
                let coeff = 0;
                switch (direction) {
                    case 'forward':
                        coeff = 4;
                        break;
                    case 'backwards':
                        coeff = (-4);
                        break;
                    case 'right':
                        coeff = 1;
                        break;
                    default:
                        coeff = -1;
                        break;
                }
                checkWayAndMove(coeff, steps);
            }
        }
    } else if (command !== '') {
        codeLine.classList.add('wrong-command');
        alert('Syntax error!');
    }
}

runButton.addEventListener('click', readCommand);