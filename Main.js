let boxes = document.querySelectorAll(".box");
let winnerText = document.querySelector(".winner");
let playerX = true;
let msg = document.getElementById("msg");
let newGameBtn = document.querySelector(".newGame");
let resetBtn = document.querySelector(".reset");
let count = 0;

const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.textContent) { // Check if box is empty
            if (playerX) {
                box.textContent = "X";
                playerX = false;
            } else {
                box.textContent = "O";
                playerX = true;
            }
            count++;
            let wins = checkWinner();
            if (count === 9 && !wins) {
                gameDraw();
            }
        }
    });
});

const gameDraw = () => {
    msg.textContent = "Game was a Draw!";
    winnerText.classList.remove("hidden");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winningPattern) {
        let pos0 = boxes[pattern[0]].textContent;
        let pos1 = boxes[pattern[1]].textContent;
        let pos2 = boxes[pattern[2]].textContent;

        if (pos0 !== "" && pos1 !== "" && pos2 !== "") {
            if (pos0 === pos1 && pos1 === pos2) {
                msg.textContent = `CONGRATULATIONS! WINNER IS ${pos0}`;
                winnerText.classList.remove("hidden");
                disableBoxes();
                return true;
            }
        }
    }
    return false;
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// resetBtn.addEventListener("click", () => {
//     enableBoxes();
// });

newGameBtn.addEventListener("click", () => {
    enableBoxes();
});

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.textContent = "";
        msg.textContent = "";
    });
    count = 0;
    playerX = true;
};
