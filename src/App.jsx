import "./css/App.css"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import Main from "./components/Main"

import {useState, useEffect} from "react"

function App() {
	const [searchedKeyword, setSearchedKeyword] = useState("keyboard")
	const [queryData, setQueryData] = useState(null)

	useEffect(() => {
		async function getSearchedKeyword() {
			const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedKeyword}`)
			const data = await response.json()
			setQueryData(data)
		}
		getSearchedKeyword()
	}, [searchedKeyword])

	return (
		<>
			<Header />
			<SearchBar
				searchedKeyword={searchedKeyword}
				setSearchedKeyword={setSearchedKeyword}
				setQueryData={setQueryData}
			/>
			<Main queryData={queryData} setSearchedKeyword={setSearchedKeyword} />
		</>
	)
}

export default App
