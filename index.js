const searchInput = document.querySelector(".search-input")
const searchBar = document.querySelector(".search-bar")
const mainSearchResultEl = document.querySelector(".main-search-result")

const selectEl = document.querySelector("select")
const container = document.querySelector(".container")
selectEl.addEventListener("change", () => {
	container.classList.remove("sans-serif", "serif", "mono")
	container.classList.add(selectEl.value)
	localStorage.setItem("fontFamily", selectEl.value)
})

const savedFont = localStorage.getItem("fontFamily")
if (savedFont) {
	selectEl.value = savedFont
	container.classList.remove("sans-serif", "serif", "mono")
	container.classList.add(savedFont)
}

async function render(searchKeyword) {
	const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchKeyword}`)
	if (!response.ok) {
		return (mainSearchResultEl.innerHTML = `
			<article class="no-def-msg">
				<img src="./assets/images/sad-emoji.png" alt="" aria-hidden="true">
				<h1>No Definitions Found</h1>
				<p>Sorry pal, we couldn't find definitions for the word you were looking for. 
					You can try the search again at later time or head to the web instead.</p>
			</article>
		`)
	}

	const data = await response.json()
	console.log(data)

	const wordAudioSrc = data[0].phonetics.find((item) => item.audio)?.audio
	const headerHtml = `
		<section class="title-section">
			<div class="word-container">
				<h1 class="main-title">${data[0].word}</h1>
				${data[0].phonetic ? `<span class="phonetic">${data[0].phonetic}</span>` : ""}
			</div>
			<div class="audio-container">
				<audio class="audio">
					<source src="${wordAudioSrc}" type="audio/mp3">
				</audio>
				${wordAudioSrc ? `<button class="play-btn" aria-label="Play to hear pronunciation"></button>` : ""}
			</div>
		</section>
	`

	// prettier-ignore
	const wordMeaningHtml = data[0].meanings.map((meaning) => `
		<article class="meaning">
			<h2 class="secondary-heading">${meaning.partOfSpeech}</h2>
			<div class="description">
				<h3 class="heading-3">Meaning</h3>
				<ul class="desc-list">${meaning.definitions.map((def) => `
					<li>${def.definition}
						${def.example ? `<span>"${def.example}"</span>` : ""}
					</li>`).join("")}
				</ul>
				</div>
				${meaning.synonyms.length > 0 
					? `<div class="synonyms">
							<h3 class="heading-3">Synonyms</h3> 
							<div class="synonym-links">${meaning.synonyms.map(syn => `
								<span class="synonym-link">${syn}</span>`)}
							</div>
						</div>`
					: ""}
		</article>	
	`).join("")

	// prettier-ignore
	const sourceUrl = `
		<article class="source">
			<h4 class="heading-4">Source</h4>
			<cite class="source-links"> ${data[0].sourceUrls.map((url) => `
					<a href="${url}}">${url}
						<img class="new-window" src="./assets/images/icon-new-window.svg" alt="" aria-hidden="true"/>
					</a>
				`).join("")}
			</cite>
		</article>
	`

	mainSearchResultEl.innerHTML = headerHtml + wordMeaningHtml + sourceUrl

	const wordAudio = document.querySelector(".audio")
	const playBtn = document.querySelector(".play-btn")
	playBtn ? playBtn.addEventListener("click", () => wordAudio.play()) : ""

	const synonymLink = document.querySelectorAll(".synonym-link")
	synonymLink.forEach((synLink) => {
		synLink.addEventListener("click", () => {
			searchInput.value = synLink.textContent
			render(searchInput.value)
		})
	})
}

render(searchInput.value) // First placeholder rendering

// Searched word rendering
searchBar.addEventListener("submit", (event) => {
	event.preventDefault()
	!searchInput.value
		? (mainSearchResultEl.innerHTML = `<p class="empty-error">Whoops, can't be empty…</p>`)
		: render(searchInput.value)
	!searchInput.value ? (searchBar.style.border = "1px solid #ff5252") : (searchBar.style.border = "none")
})

const colorSchemeBtn = document.querySelector("#color-scheme")

const prefersLightColorScheme = () =>
	window && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

prefersLightColorScheme()
	? (colorSchemeBtn.checked = !colorSchemeBtn.checked)
	: (colorSchemeBtn.checked = !colorSchemeBtn.checked)

colorSchemeBtn.addEventListener("change", () => {
	localStorage.setItem("theme", colorSchemeBtn.checked ? "dark" : "light")
})

const savedTheme = localStorage.getItem("theme")
savedTheme
	? (colorSchemeBtn.checked = savedTheme === "dark")
	: (colorSchemeBtn.checked = window.matchMedia("(prefers-color-scheme: dark)").matches)
