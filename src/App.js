import { useRef, useState } from "react";
import "./App.scss";

import StorySection from "./components/StorySection/StorySection";
import birthdaySections from "./data/birthdaySections";

const App = () => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Nie udało się uruchomić muzyki:", error);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const changeVolume = (event) => {
    const newVolume = Number(event.target.value);

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <main className="birthday">
      <audio
        ref={audioRef}
        src="/audio/romus.mp3"
        loop
        preload="auto"
      />

      <section className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">
            dla mojej ukochanej narzeczonej
          </span>

          <h1>
            Wszystkiego
            <br />
            najlepszego,
            <br />
            <span>Celinka.</span>
            <br />
            dziubasku...
          </h1>

          <p>
            Nie chciałem tym razem wysyłać Ci po prostu zwykłych
            życzeń.
          </p>

          <div className="musicPlayer">
            <button
              className="musicPlayer__button"
              onClick={toggleMusic}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>

            <div className="musicPlayer__info">
              <span className="musicPlayer__label">
                {isPlaying ? "teraz gra" : "włącz muzykę"}
              </span>

              <span className="musicPlayer__title">
                nasza piosenka ♡
              </span>
            </div>

            <div className="musicPlayer__volume">
              <span>♪</span>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={changeVolume}
                aria-label="Głośność muzyki"
              />
            </div>
          </div>

          <div className="hero__scroll">
            <span>przewiń</span>
            <span className="hero__arrow">↓</span>
          </div>
        </div>
      </section>

      <div className="story">
        {birthdaySections.map((section, index) => (
          <StorySection
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </div>

      <section className="ending">
        <div className="ending__inner">
          <div className="ending__content">
            <span>i jeszcze jedno...</span>

            <h2>
              Kocham
              <br />
              Cię.
            </h2>

            <p>Wszystkiego najlepszego, Celinka.</p>

            <small>— Kacper</small>
          </div>

          <div className="ending__photos">
            <div className="ending__photo ending__photo--one">
              <img
                src="/images/footer/footer-1.jpg"
                alt="Celinka"
              />
            </div>

            <div className="ending__photo ending__photo--two">
              <img
                src="/images/footer/footer-2.jpg"
                alt="Celinka"
              />
            </div>

            <div className="ending__photo ending__photo--three">
              <img
                src="/images/footer/footer-3.jpg"
                alt="Celinka"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;