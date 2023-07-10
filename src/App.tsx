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
                        0
                    </span>
                </div>
                <div className="keyboard">
                    <div className="row">
                        <button className="btn btn-normal">7</button>
                        <button className="btn btn-normal">8</button>
                        <button className="btn btn-normal">9</button>
                        <button className="btn btn-delete">DEL</button>
                    </div>
                    <div className="row">
                        <button className="btn btn-normal">4</button>
                        <button className="btn btn-normal">5</button>
                        <button className="btn btn-normal">6</button>
                        <button className="btn btn-normal">+</button>
                    </div>
                    <div className="row">
                        <button className="btn btn-normal">1</button>
                        <button className="btn btn-normal">2</button>
                        <button className="btn btn-normal">3</button>
                        <button className="btn btn-normal">-</button>
                    </div>
                    <div className="row">
                        <button className="btn btn-normal">.</button>
                        <button className="btn btn-normal">0</button>
                        <button className="btn btn-normal">/</button>
                        <button className="btn btn-normal">+</button>
                    </div>
                    <div className="row">
                        <button className="btn btn-reset">RESET</button>
                        <button className="btn btn-equal">=</button>
                    </div>
                </div>
            </div>
    );
}

export default App;
