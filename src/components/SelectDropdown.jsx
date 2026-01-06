import "../css/SelectDropdown.css"
import arrowDown from "../assets/icon-arrow-down.svg"

import {useState, useEffect, useRef} from "react"

export default function SelectDropdown() {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState("Sans Serif")
	const selectDropdownEl = useRef(null)

	function toggleDropdown() {
		setIsOpen((prev) => !prev)
	}

	function selectOption(option) {
		setSelectedOption(option)
		setIsOpen(false)
	}

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
		document.documentElement.setAttribute("data-font", selectedOption)
	}, [selectedOption])

	return (
		<div className="custom-select" ref={selectDropdownEl}>
			<button className="select-btn" aria-haspopup="listbox" onClick={toggleDropdown}>
				{selectedOption}
				<img src={arrowDown} alt="" />
			</button>
			{isOpen ? (
				// prettier-ignore
				<ul className="option-container" role="listbox">
              <li role="option" onClick={() => selectOption("Sans Serif")}>Sans Serif</li>
              <li role="option" onClick={() => selectOption("Serif")}>Serif</li>
              <li role="option" onClick={() => selectOption("Mono")}>Mono</li>
            </ul>
			) : null}
		</div>
	)
}
