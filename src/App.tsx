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
                    <ThemeSwitcher setTheme={setTheme} />
                </div>
            </div>
    );
}

export default App;
