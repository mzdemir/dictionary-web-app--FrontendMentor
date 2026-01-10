import "../css/SelectDropdown.css"
import arrowDown from "../assets/icon-arrow-down.svg"

import {useState, useEffect, useRef} from "react"

export default function SelectDropdown() {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedFont, setSelectedFont] = useState(getSavedFont())
	const selectDropdownEl = useRef(null)

	function toggleDropdown() {
		setIsOpen((prev) => !prev)
	}

	function selectFont(option) {
		setSelectedFont(option)
		setIsOpen(false)
	}

	function getSavedFont() {
		const savedFont = localStorage.getItem("font")

		if (savedFont) {
			return savedFont
		} else {
			return "Sans Serif" // default font
		}
	}

	// Handle outside click to close the dropdown
	useEffect(() => {
		function handleOutSideClick(event) {
			if (selectDropdownEl.current && !selectDropdownEl.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		window.addEventListener("click", handleOutSideClick)
		return () => window.removeEventListener("click", handleOutSideClick)
	}, [])

	useEffect(() => {
		document.documentElement.setAttribute("data-font", selectedFont)
		localStorage.setItem("font", selectedFont)
	}, [selectedFont])

	return (
		<div className="custom-select" ref={selectDropdownEl}>
			<button
				className="select-btn"
				onClick={toggleDropdown}
				aria-haspopup="menu"
				aria-expanded={isOpen}
				aria-controls="dropdown">
				{selectedFont}
				<img src={arrowDown} alt="" />
			</button>
			{isOpen ? (
				// prettier-ignore
				<div className="option-container" id="dropdown" role="menu">
					<button role="menuitem" onClick={() => selectFont("Sans Serif")}>Sans Serif</button>
					<button role="menuitem" onClick={() => selectFont("Serif")}>Serif</button>
					<button role="menuitem" onClick={() => selectFont("Mono")}>Mono</button>
        </div>
			) : null}
		</div>
	)
}
