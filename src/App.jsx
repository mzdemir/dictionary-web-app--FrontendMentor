import "./css/App.css"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import {useState} from "react"

function App() {
	const [apiResponse, setApiResponse] = useState(null)
	console.log(apiResponse)
	return (
		<>
			<Header />
			<SearchBar setApiResponse={setApiResponse} />

			{apiResponse && <pre>{JSON.stringify(apiResponse, null, 2)}</pre>}
		</>
	)
}

export default App
