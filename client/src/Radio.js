import React , {useState,useEffect} from 'react';
import { RadioBrowserApi } from "radio-browser-api";

export default function Radio() {
  const [stations, setStations] = useState();

  const getStations = async () => {

  const api = new RadioBrowserApi("MVP Radio App");

  // query stations by languge and tag
  const stations = await api.searchStations({
    language: 'english',
    tag:'jazz',
    limit: 10
  }).then(response => {
    setStations(response);
  })
  return stations;
}

  useEffect(() => {
    getStations();
  });

  return (
    <div className="radio">
      <div className="stations">{stations}</div>
    </div>
  );
}