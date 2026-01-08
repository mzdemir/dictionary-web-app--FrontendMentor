import "../css/Main.css"
import newWindowIcon from "../assets/icon-new-window.svg"
import sadEmoji from "../assets/sad-emoji.png"

import {useRef} from "react"

export default function Main({queryData}) {
	const wordAudio = useRef(null)

	const wordAudioSrc =
		queryData?.[0]?.phonetics?.find((item) => item.audio?.endsWith("us.mp3"))?.audio ||
		queryData?.[0]?.phonetics?.find((item) => item.audio)?.audio

	return (
		// prettier-ignore
		queryData === "" 
    ? <p className="empty-error">Whoops, can't be empty…</p> 
    : queryData && ("title" in queryData)
    ? <article className="no-def-msg">
			  <img src={sadEmoji} alt="" aria-hidden="true"/>
				<h1>{queryData.title}</h1>
				<p>{queryData.message} {queryData.resolution}</p>
			</article> 
    : queryData
    ? <main className="main-search-result" aria-live="assertive">
        <section className="title-section">
          <div className="word-container">
            <h1 className="main-title">{queryData[0].word}</h1>
            {queryData[0].phonetic ? <span className="phonetic">{queryData[0].phonetic}</span> : ""}
          </div>
          <div className="audio-container">
            {/* key is added cause browser wasn't automatically reloading when <source src> changed */}
            <audio key={wordAudioSrc} ref={wordAudio} className="audio">
              <source src={wordAudioSrc} type="audio/mp3" />
            </audio>
            {wordAudioSrc ? 
              <button className="play-btn" onClick={() => wordAudio.current.play()} aria-label="Play to hear pronunciation">
              </button> : ""}
          </div>
        </section>

      {queryData[0].meanings.map((meaning, index) => 
        <article key={index} className="meaning">
          <h2 className="secondary-heading">{meaning.partOfSpeech}</h2>
          <div className="description">
            <h3 className="heading-3">Meaning</h3>
            <ul className="desc-list">{meaning.definitions.map((def, index) => 
              <li key={index}> {def.definition}
                {def.example ? <span>"{def.example}"</span> : ""}
              </li>)}
            </ul>
          </div>
          {meaning.synonyms.length > 0
            ? <div className="synonyms">
                <h3 className="heading-3">Synonyms</h3> 
                <div className="synonym-links">{meaning.synonyms.map((syn, index) => 
                  <a className="synonym-link" key={index}>{syn}</a>)}
                </div>
              </div>
            : ""}
        </article>)}
        
        <article className="source">
          <h4 className="heading-4">Source</h4>
          <cite className="source-links"> {queryData[0].sourceUrls.map((url, index) => 
            <a key={index} href={url}>{url}
              <img className="new-window" src={newWindowIcon} alt="" aria-hidden="true"/>
            </a>)}
          </cite>
        </article>
      </main>
    : null
	)
}
