import "./css/App.css"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import Main from "./components/Main"
import {useState} from "react"

function App() {
	const [queryData, setqueryData] = useState(null)

	return (
		<>
			<Header />
			<SearchBar setqueryData={setqueryData} />
			<Main queryData={queryData} />
		</>
	)
}

export default App
