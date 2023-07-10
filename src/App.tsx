import { useState, useEffect } from "react";
import "./App.scss";


interface ThemeSwitcherProps {
    setTheme: (theme: string) => void;
}

export function ThemeSwitcher({ setTheme}: ThemeSwitcherProps) {


    const handleTheme = (e: React.ChangeEvent) => {
        const { id } = e.target;
        setTheme(id);
    };

    return (
        <div className="theme-switcher">
            <label htmlFor="theme1">
                <input
                    name="theme"
                    defaultChecked={true}
                    id="theme1"
                    type="radio"
                    onChange={handleTheme}
                />
            </label>
            <label htmlFor="theme2">
                <input
                    name="theme"
                    id="theme2"
                    type="radio"
                    onChange={handleTheme}
                />
            </label>
            <label htmlFor="theme3">
                <input
                    name="theme"
                    id="theme3"
                    type="radio"
                    onChange={handleTheme}
                />
            </label>
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

        if(!firstNumber || !secondNumber || !operation) return;

        const first = Number(firstNumber)
        const second = Number(secondNumber);

        switch (operation) {
            case "+":
                setResult((first + second).toString());
                break;
            case "-":
                setResult((first - second).toString());
                break;
            case "*":
                setResult((first * second).toString());
                break;
            case "/":
                setResult((first / second).toString());
                break;
            default:
                break;
        }

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
                      <ThemeSwitcher setTheme={setTheme} />
                    </div>
                </div>
                <div className="screen">
                    <span className="result">
                        {screen}
                    </span>
                </div>
                <div className="keyboard">
                    <div className="row">
                        <button onClick={handleNumber} id="7" className="btn btn-normal">7</button>
                        <button onClick={handleNumber} id="8" className="btn btn-normal">8</button>
                        <button onClick={handleNumber} id="9" className="btn btn-normal">9</button>
                        <button onClick={handleDelete} className="btn btn-delete">DEL</button>
                    </div>
                    <div className="row">
                        <button onClick={handleNumber} id="4" className="btn btn-normal">4</button>
                        <button onClick={handleNumber} id="5" className="btn btn-normal">5</button>
                        <button onClick={handleNumber} id="6" className="btn btn-normal">6</button>
                        <button onClick={handleOperation} id="+"  className="btn btn-normal">+</button>
                    </div>
                    <div className="row">
                        <button onClick={handleNumber} id="1" className="btn btn-normal">1</button>
                        <button onClick={handleNumber} id="2" className="btn btn-normal">2</button>
                        <button onClick={handleNumber} id="3" className="btn btn-normal">3</button>
                        <button onClick={handleOperation} id="-" className="btn btn-normal">-</button>
                    </div>
                    <div className="row">
                        <button className="btn btn-normal">.</button>
                        <button onClick={handleNumber} className="btn btn-normal">0</button>
                        <button onClick={handleOperation} id="/" className="btn btn-normal">/</button>
                        <button onClick={handleOperation} id="x" className="btn btn-normal">X</button>
                    </div>
                    <div className="row">
                        <button onClick={handleReset} className="btn btn-reset">RESET</button>
                        <button onClick={handleEqual} className="btn btn-equal">=</button>
                    </div>
                </div>
            </div>
    );
}

export default App;
