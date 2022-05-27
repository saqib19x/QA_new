import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "gray",
    progressColor: "OrangeRed",
    cursorColor: "OrangeRed",
    barWidth: 1,
    barGap: 3,
    height: 30,
    responsive: true,
    normalize: true,
    partialRender: true,
    hideScrollbar: true,
    scrollParent: true,
});
export default function Audio({ Audiourl, urllink }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [dur, setDur] = useState(0);
    const AudioDur = useRef();
    const [play, setPlay] = useState(false);
    const [url, setURl] = useState("/audio/audio_1st.mp3");
    useEffect(() => {
        setPlay(false);
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        wavesurfer.current.load(url);
        wavesurfer.current.on("pause", function () {
            return () => wavesurfer.current.destroy();
        });
    }, [url]);

    const handlePlayPause = () => {
        setPlay(!play);
        if (!play) {
            wavesurfer.current.play();
            const second = Math.floor(AudioDur.current.duration);
            setDur(second);
        } else {
            wavesurfer.current.pause();
        }
    };
    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        if (!isNaN(secs)) {
            return `${returnedMinutes}:${returnedSeconds}`;
        } else {
            return `00:00`;
        }
    };

    return (
        <>
            <div className="relative w-full flex p-1 h-10 overflow-hidden items-center">
                <audio ref={AudioDur}>
                    <source src={urllink} type="audio/mp3" />
                </audio>
                <div className="rounded-full border-[1.5px] w-9 h-8 flex items-center justify-center cursor-pointer border-[#FF7949]">
                    <p onClick={handlePlayPause} className="text-base">
                        {play ? (
                            <i className="fa-solid fa-pause text-[#FF7949]"></i>
                        ) : (
                            <i className="fa-solid fa-play text-[#FF7949]"></i>
                        )}
                    </p>
                </div>
                <div className="w-full mx-2" ref={waveformRef}></div>
                <div className="text-gray-500 text-xs font-bold">
                    <p>{calculateTime(dur)}</p>
                </div>
            </div>
        </>
    );
}
