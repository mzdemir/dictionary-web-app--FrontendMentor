import "../css/ToggleSwitch.css"

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
			<svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22">
				<path
					fill="none"
					stroke="#currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
				/>
			</svg>
		</div>
	)
}
