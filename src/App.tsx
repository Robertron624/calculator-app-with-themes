import { useState, useEffect } from "react";
import "./App.scss";

interface ThemeSwitcherProps {
    setTheme: (theme: string) => void;
    theme: string;
}

export function ThemeSwitcher({ setTheme, theme }: ThemeSwitcherProps) {
    const handleTheme = (e: React.ChangeEvent) => {
        const {id} = e.target as HTMLInputElement;
        setTheme(id);
    };

    const handleClick = (e: React.MouseEvent) => {        
        // check if the click was on the span element
        if (e.target instanceof HTMLSpanElement) {
            let id = e.target.id;
            // delete the -number part
            id = id.slice(0, -7);
            setTheme(id);
        }
    };

    return (
        <div className="theme-switcher">
          <div className="numbers">
            <span id="theme1-number" onClick={handleClick}>1</span>
            <span id="theme2-number" onClick={handleClick}>2</span>
            <span id="theme3-number" onClick={handleClick}>3</span>
          </div>
          <div className="inputs">
            <label htmlFor="theme1">
                <input
                    name="theme"
                    id="theme1"
                    type="radio"
                    onChange={handleTheme}
                    checked={theme === "theme1"}
                />
                <i></i>
            </label>
            <label htmlFor="theme2">
                <input
                    name="theme"
                    id="theme2"
                    type="radio"
                    onChange={handleTheme}
                    checked={theme === "theme2"}
                />
                <i></i>
            </label>
            <label htmlFor="theme3">
                <input
                    name="theme"
                    id="theme3"
                    type="radio"
                    onChange={handleTheme}
                    checked={theme === "theme3"}
                />
                <i></i>
            </label>
          </div>
        </div>
    );
}

function App() {
    const [theme, setTheme] = useState<string>("theme1");

    const [result, setResult] = useState<string>("0");

    const [screen, setScreen] = useState<string>("0");

    const [firstNumber, setFirstNumber] = useState<string>("");
    const [secondNumber, setSecondNumber] = useState<string>("");

    const [operation, setOperation] = useState<string>("");

    const handleReset = () => {
        setResult("");
        setScreen("0");
        setFirstNumber("");
        setSecondNumber("");
        setOperation("");
    };

    const handleDelete = () => {
        setResult(result.slice(0, -1));
        setScreen(screen.slice(0, -1));

        if (operation === "") {
            setFirstNumber(firstNumber.slice(0, -1));
        }

        if (operation !== "") {
            setSecondNumber(secondNumber.slice(0, -1));
        }
    };

    const handleEqual = () => {
        if (!firstNumber || !secondNumber || !operation) return;

        const first = Number(firstNumber);
        const second = Number(secondNumber);

        let result = 0;

        switch (operation) {
            case "+":
                result = first + second;
                break;
            case "-":
                result = first - second;
                break;
            case "x":
                result = first * second;
                break;
            case "/":
                result = first / second;
                break;
            default:
                break;
        }

        // limit to 3 decimal places after the dot
        if (result.toString().includes(".")) {
            const [integer, decimal] = result.toString().split(".");
            result = Number(`${integer}.${decimal.slice(0, 3)}`);
        }

        setResult(result.toString());
        setScreen(result.toString());
    };

    const handleNumber = (e: React.MouseEvent) => {
        const { id } = e.target as HTMLButtonElement;

        if (operation === "") {
            setFirstNumber(firstNumber + id);
            setScreen(firstNumber + id);
        } else {
            setSecondNumber(secondNumber + id);
            setScreen(secondNumber + id);
        }
    };

    const handleOperation = (e: React.MouseEvent) => {
        const { id } = e.target as HTMLButtonElement;

        if (firstNumber === "") return;

        setOperation(id);
        setScreen(id);
    };

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <div className={`container`}>
            <div className="top">
                <h1>calc</h1>
                <div className="switcher-container">
                    <span>THEME</span>
                    <ThemeSwitcher setTheme={setTheme} theme={theme} />
                </div>
            </div>
            <div className="screen">
                <span className="result">{screen}</span>
            </div>
            <div className="keyboard">
                <div className="row">
                    <button
                        onClick={handleNumber}
                        id="7"
                        className="btn btn-normal"
                    >
                        7
                    </button>
                    <button
                        onClick={handleNumber}
                        id="8"
                        className="btn btn-normal"
                    >
                        8
                    </button>
                    <button
                        onClick={handleNumber}
                        id="9"
                        className="btn btn-normal"
                    >
                        9
                    </button>
                    <button onClick={handleDelete} className="btn btn-delete">
                        DEL
                    </button>
                </div>
                <div className="row">
                    <button
                        onClick={handleNumber}
                        id="4"
                        className="btn btn-normal"
                    >
                        4
                    </button>
                    <button
                        onClick={handleNumber}
                        id="5"
                        className="btn btn-normal"
                    >
                        5
                    </button>
                    <button
                        onClick={handleNumber}
                        id="6"
                        className="btn btn-normal"
                    >
                        6
                    </button>
                    <button
                        onClick={handleOperation}
                        id="+"
                        className="btn btn-normal"
                    >
                        +
                    </button>
                </div>
                <div className="row">
                    <button
                        onClick={handleNumber}
                        id="1"
                        className="btn btn-normal"
                    >
                        1
                    </button>
                    <button
                        onClick={handleNumber}
                        id="2"
                        className="btn btn-normal"
                    >
                        2
                    </button>
                    <button
                        onClick={handleNumber}
                        id="3"
                        className="btn btn-normal"
                    >
                        3
                    </button>
                    <button
                        onClick={handleOperation}
                        id="-"
                        className="btn btn-normal"
                    >
                        -
                    </button>
                </div>
                <div className="row">
                    <button
                        onClick={handleNumber}
                        id="."
                        className="btn btn-normal"
                    >
                        .
                    </button>
                    <button
                        onClick={handleNumber}
                        id="0"
                        className="btn btn-normal"
                    >
                        0
                    </button>
                    <button
                        onClick={handleOperation}
                        id="/"
                        className="btn btn-normal"
                    >
                        /
                    </button>
                    <button
                        onClick={handleOperation}
                        id="x"
                        className="btn btn-normal"
                    >
                        x
                    </button>
                </div>
                <div className="row">
                    <button onClick={handleReset} className="btn btn-reset">
                        RESET
                    </button>
                    <button onClick={handleEqual} className="btn btn-equal">
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
