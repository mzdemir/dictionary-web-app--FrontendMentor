import "../css/AudioBtn.css"

import {useRef} from "react"

export default function AudioBtn({queryData}) {
	const wordAudio = useRef(null)

	const wordAudioSrc =
		queryData?.[0]?.phonetics?.find((item) => item.audio?.endsWith("us.mp3"))?.audio ||
		queryData?.[0]?.phonetics?.find((item) => item.audio)?.audio

	return (
		<div className="audio-container">
			{/* key is added cause browser wasn't automatically reloading when <source src> changed */}
			<audio key={wordAudioSrc} ref={wordAudio} className="audio">
				<source src={wordAudioSrc} type="audio/mp3" />
			</audio>
			{wordAudioSrc ? (
				<button className="play-btn" onClick={() => wordAudio.current.play()} aria-label="Play to hear pronunciation">
					{/* <img src={playIcon} alt="" /> */}
					<svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
						<g fill="#A445ED" fillRule="evenodd">
							<circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
							<path d="M29 27v21l21-10.5z" />
						</g>
					</svg>
				</button>
			) : null}
		</div>
	)
}
