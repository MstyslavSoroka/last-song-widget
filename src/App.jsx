import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [track, setTrack] = useState(null);
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  const username = import.meta.env.VITE_LASTFM_USERNAME;

  useEffect(() => {
    async function fetchTrack() {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
        );
        const data = await response.json();
        setTrack(data.recenttracks.track[0]);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTrack();
  }, []);

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <div className="rounded-2xl border-1 border-white flex flex-col md:flex-row p-5 md:pr-20 md:pl-20 pt-5 pb-5 gap-5">
        {track ? (
          <>
            <img
              className="rounded-full w-50 animate-spin-slow m-0 m-auto "
              src={track.image[3]['#text']}
              alt="album cover"
            />
            <div className="text-center flex flex-col justify-center gap-3 text-white md:text-left">
              <h3 className="text-xl title font-black md:text-3xl">
                {track.name}
              </h3>
              <p className="author">{track.artist['#text']}</p>
              {(track['@attr']?.nowplaying === 'true' && (
                <p>
                  playing now{' '}
                  <span className="text-green-500 animate-pulse">•</span>
                </p>
              )) || <p>played recently</p>}
            </div>
          </>
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
      ``
    </div>
  );
}

export default App;
