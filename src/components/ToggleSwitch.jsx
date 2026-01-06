import "../css/ToggleSwitch.css"
import moonIcon from "../assets/icon-moon.svg"

import {useEffect, useState} from "react"

export default function ToggleSwitch() {
	const [isDarkMode, setIsDarkMode] = useState(getInitatialTheme())

	function getInitatialTheme() {
		if (localStorage.getItem("theme")) {
			return localStorage.getItem("theme") === "dark"
		} else {
			const OSTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
			return OSTheme
		}
	}

	function handleToggleSwitch() {
		setIsDarkMode((prev) => !prev)
	}

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.setAttribute("data-darkMode", "dark")
			localStorage.setItem("theme", "dark")
		} else {
			document.documentElement.removeAttribute("data-darkMode")
			localStorage.setItem("theme", "light")
		}
	}, [isDarkMode])

	return (
		<div className="theme-toggle" role="group" aria-label="Theme toggle">
			<label className="checkbox-label" aria-label="Toggle dark mode">
				<input type="checkbox" id="color-scheme" role="switch" checked={isDarkMode} onChange={handleToggleSwitch} />
			</label>
			<img className="theme-icon" src={moonIcon} alt="Moon icon" />
		</div>
	)
}
