import React from 'react';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=2ed3341a16894348b0577b13b7987837&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function SpotifyLogin() {
  return (
      <a href={AUTH_URL}>Login</a>
  );
}