import {} from "react"
import "../css/SearchBar.css"

import {useRef} from "react"

export default function SearchBar({setApiResponse}) {
	const inputRef = useRef(null)

	async function handleSubmit(event) {
		event.preventDefault()

		const searchKeyword = inputRef.current.value.trim()
		if (searchKeyword === "") {
			return setApiResponse("")
		} else {
			const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchKeyword}`)
			const data = await res.json()
			if (!res.ok) {
				setApiResponse(data)
				return
			}
			setApiResponse(data)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="search-bar" role="search">
			<label aria-label="Search for any word…">
				<input
					type="text"
					className="search-input"
					name="search-query"
					placeholder="Search for any word…"
					defaultValue="keyboard"
					ref={inputRef}
				/>
			</label>
			<button className="search-btn" type="submit" aria-label="Search button"></button>
		</form>
	)
}
