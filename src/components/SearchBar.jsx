import {} from "react"
import "../css/SearchBar.css"

import {useEffect, useRef} from "react"

export default function SearchBar({setqueryData}) {
	const inputRef = useRef(null)

	// Fetching data with a default value to pre-populate the app. Runs once
	useEffect(() => {
		async function fetchInitialWord() {
			const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/keyboard`)
			const data = await res.json()
			setqueryData(data)
		}
		fetchInitialWord()
	}, [setqueryData])

	// Fetching with user-entered value
	async function handleSubmit(event) {
		event.preventDefault()

		const searchKeyword = inputRef.current.value.trim()
		if (searchKeyword === "") {
			return setqueryData("")
		} else {
			const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchKeyword}`)
			const data = await res.json()
			if (!res.ok) {
				setqueryData(data)
				return
			}
			setqueryData(data)
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
