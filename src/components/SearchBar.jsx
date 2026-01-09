import "../css/SearchBar.css"
import {useState, useEffect} from "react"

export default function SearchBar({searchedKeyword, setSearchedKeyword, setQueryData}) {
	const [inputValue, setInputValue] = useState(searchedKeyword)

	// keep input in sync when synonym is clicked
	useEffect(() => {
		setInputValue(searchedKeyword)
	}, [searchedKeyword])

	function handleSubmit(event) {
		event.preventDefault()

		const query = inputValue.trim()
		query === "" ? setQueryData("") : setSearchedKeyword(query)
	}

	return (
		<form onSubmit={handleSubmit} className="search-bar" role="search">
			<label aria-label="Search for any word…">
				<input
					type="text"
					className="search-input"
					name="search-query"
					placeholder="Search for any word…"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</label>
			<button className="search-btn" type="submit" aria-label="Search button" />
		</form>
	)
}
