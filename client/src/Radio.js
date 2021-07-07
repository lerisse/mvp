import React , {useState,useEffect} from 'react';
import { RadioBrowserApi } from "radio-browser-api";

export default function Radio() {
  const [stations, setStations] = useState([]);

  const getStations = async () => {
    const api = new RadioBrowserApi("MVP Radio App");
    // query stations by languge and tag
    const stations = await api.searchStations({
      countryCode: 'US',
      tag:'jazz',
      limit: 10
    }).then(response => {
      setStations(response);
    })
    return stations;
}

  useEffect(() => {
    getStations();
  }, []);

  return (
    <div className="radio">
      <div className="stations">
      {stations.map(station => {
        return (
          <div key={station.id} className="station">
            <img src={station.favicon} alt="Radio Station Thumbnail"></img>
            <div className="name">{station.name}</div>
            <div className="description">{station.description}</div>
          </div>
        )
      })}
      </div>
    </div>
  );
}