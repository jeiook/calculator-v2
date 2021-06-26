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
	return x / y;
}

function operate(op, x, y) {
	return op(x, y);
}

function updateScreen(val, el) {
	el.textContent = val;
}

function main() {
	let screenVal = "";
	let firstVal = "";
	let currentOp = null;
	const ops = {"add": add, "sub": subtract, "mul": multiply, "div": divide};
	const screen = document.getElementById("screen");
	const digBtns = document.getElementById("digs-container").childNodes;
	const opBtns = document.getElementById("ops-container").childNodes;
	const eqBtn = document.getElementById("equals");
	const clearBtn = document.getElementById("clear");
	digBtns.forEach(e => {
		e.addEventListener("click", () => {
			screenVal = String(Number(screenVal + e.getAttribute('id')));
			updateScreen(screenVal, screen);
		});
	});
	opBtns.forEach(e => {
		e.addEventListener("click", () => {
			if (!currentOp) {
				firstVal = screenVal;
				screenVal = "";
				updateScreen(screenVal, screen);
			}
			currentOp = ops[e.getAttribute('id')];
		});
	});
	eqBtn.addEventListener("click", () => {
		screenVal = operate(currentOp, Number(firstVal), Number(screenVal));
		currentOp = null;
		updateScreen(screenVal, screen);
	});
	clearBtn.addEventListener("click", () => {
		screenVal = "";
		firstVal = "";
		currentOp = null;
		updateScreen(screenVal, screen);
	});
}

main();
