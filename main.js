function add(x, y) {
	return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	if (y == 0) {
		alert("Division by 0 is invalid");
		return 0;
	}
	return x / y;
}

function operate(op, x, y) {
	return op(x, y);
}

function updateScreen(screenVal, firstVal, op, screen) {
	screenVal = String(Math.round(Number(screenVal) * 1000000) / 1000000);
	if (firstVal) {
		firstVal = String(Math.round(Number(firstVal) * 1000000) / 1000000);
	}
	screen.querySelector("#screen-val").textContent = screenVal;
	screen.querySelector("#curr-op").textContent = op;
	screen.querySelector("#first-val").textContent = firstVal;
}

function main() {
	let screenVal = "0";
	let firstVal = "";
	let currentOp = null;
	let currentOpStr = "";
	const ops = {"add": add, "sub": subtract, "mul": multiply, "div": divide};
	const screen = document.getElementById("screen");
	const digBtns = document.getElementById("digs-container").childNodes;
	const opBtns = document.getElementById("ops-container").childNodes;
	const eqBtn = document.getElementById("equals");
	const clearBtn = document.getElementById("clear");
	digBtns.forEach(e => {
		e.addEventListener("click", () => {
			screenVal = String(Number(screenVal + e.getAttribute('id')));
			updateScreen(screenVal, firstVal, currentOpStr, screen);
		});
	});
	opBtns.forEach(e => {
		e.addEventListener("click", () => {
			if (!currentOp) {
				firstVal = screenVal;
				screenVal = "0";
			}
			currentOpStr = e.getAttribute('id');
			currentOp = ops[currentOpStr];
			updateScreen(screenVal, firstVal, currentOpStr, screen);
		});
	});
	eqBtn.addEventListener("click", () => {
		if (currentOp && firstVal && screenVal) {
			screenVal = operate(currentOp, Number(firstVal), Number(screenVal));
			currentOp = null;
			currentOpStr = "";
			firstVal = "";
			updateScreen(screenVal, firstVal, currentOpStr, screen);
		}
	});
	clearBtn.addEventListener("click", () => {
		screenVal = "0";
		firstVal = "";
		currentOp = null;
		currentOpStr = "";
		updateScreen(screenVal, firstVal, currentOpStr, screen);
	});
	updateScreen(screenVal, firstVal, currentOpStr, screen);
}

main();
