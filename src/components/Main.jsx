import "../css/Main.css"
import newWindowIcon from "../assets/icon-new-window.svg"
import sadEmoji from "../assets/sad-emoji.png"
import AudioBtn from "./AudioBtn"

export default function Main({queryData, setSearchedKeyword}) {
	return (
		// prettier-ignore
		queryData === ""
    ? <p className="empty-error heading-s">Whoops, can't be empty…</p>
    : queryData && ("title" in queryData)
    ? <article className="no-def-msg">
			  <img src={sadEmoji} alt="" aria-hidden="true"/>
				<h1 className="heading-s">{queryData.title}</h1>
				<p className="body-s">{queryData.message} {queryData.resolution}</p>
			</article> 
    : queryData
    ? <main className="main-search-result" aria-live="assertive">
        <section className="title-section">
          <div className="word-container">
            <h1 className="main-title heading-l">{queryData[0].word}</h1>
            {queryData[0].phonetic 
            ? <span className="phonetic heading-m">{queryData[0].phonetic}</span> 
            : <span className="phonetic heading-m">{queryData[0]?.phonetics?.find(item => item.text)?.text}</span>}
          </div>
          <AudioBtn queryData={queryData}/>
        </section>

      {queryData.map((item) => item.meanings.map((meaning, index) => 
        <article key={index} className="meaning">
          <h2 className="secondary-heading heading-m">{meaning.partOfSpeech}</h2>
          <div className="description">
            <h3 className="heading-3 heading-s">Meaning</h3>
            <ul className="desc-list body-s">{meaning.definitions.map((def, index) => 
              <li key={index}> {def.definition}
                {def.example ? <span>"{def.example}"</span> : null}
              </li>)}
            </ul>
          </div>
          {meaning.synonyms.length > 0
          ? <div className="synonyms heading-s">
              <h3 className="heading-3 ">Synonyms</h3> 
              <div className="synonym-links">{meaning.synonyms.map((syn, index) => 
                <a onClick={() => setSearchedKeyword(syn)} className="synonym-link" key={index}>{syn}</a>)}
              </div>
            </div>
          : null}
        </article>))}
        
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
