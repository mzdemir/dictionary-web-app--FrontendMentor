import "../css/Header.css"
import logo from "../assets/logo.svg"

import SelectDropdown from "./SelectDropdown"
import ToggleSwitch from "./ToggleSwitch"

export default function Header() {
	return (
		<header>
			<nav className="primary-nav" aria-label="primary navigation">
				<img className="logo" src={logo} alt="Dictionary logo" />
				<SelectDropdown />
				<ToggleSwitch />
			</nav>
		</header>
	)
}
