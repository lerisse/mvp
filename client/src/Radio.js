import React , {useState,useEffect} from 'react';
import { RadioBrowserApi } from "radio-browser-api";

export default function Radio() {
  const [stations, setStations] = useState([]);
  const [genres, setGenres] = useState("all");

  const getStations = async () => {
    const api = new RadioBrowserApi("MVP Radio App");
    // query stations by languge and tag
    const stations = await api.searchStations({
      language: "english",
      tag: genres,
      limit: 10
    }).then(response => {
      setStations(response);
    })
    return stations;
}

const radioGenres = [
  "all",
  "classical",
  "country",
  "dance",
  "disco",
  "house",
  "jazz",
  "pop",
  "rap",
  "retro",
  "rock"
];

  useEffect(() => {
    getStations();
  }, []);

  return (
    <div className="radio">
      <div className="filters">
        {radioGenres.map((genre, index) => (
          <span
            key={index}
            className={genres === radioGenres ? "selected" : ""}
            onClick={() => setGenres(genre)}
          >
            {genre}
          </span>
        ))}
      </div>
      <div className="stations">
      {stations.map(station => {
        return (
          <div key={station.id} className="station">
            <img src={station.favicon} alt="Radio Station Thumbnail"></img>
            <div className="name">{station.name}</div>
            <div>
              <audio src={station.urlResolved} controls />
            </div>
          </div>
        )
      })}
      </div>
    </div>
  );
}