import React from 'react';
import { RadioBrowserApi } from "radio-browser-api";

export default function Radio() {


  const api = new RadioBrowserApi("MVP Radio App");

    // query stations by languge and tag
// const stations = await api.searchStations({
//   language: 'english',
//   tag:'jazz'
//   limit: 100
// })

  return (
    <div className="radio">
      <h2>Radio goes here</h2>
    </div>
  );
}