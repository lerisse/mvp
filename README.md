# mvp
Minimum Viable Product project

Music player app which will use MongoDB to help with Spotify rate limiter. If possible, implement a jukebox or lyric fetcher.

Stack:
Front End:
- React w/ Hooks
- SASS

Back End:
- Express
- Axios
- Mongoose
- DotEnv

Database:
- MongoDB


Spotify App created
Spotify Authorize endpoint: https://developer.spotify.com/documentation/general/guides/authorization-guide/
Spotity AUTH URL : GET https://accounts.spotify.com/authorize
- Options:
-- client_id = 2ed3341a16894348b0577b13b7987837
-- response_type = code
-- redirect_uri = http://localhost:3000
-- scope = streaming, user-read-private, user-read-email, playlist-read-private, user-library-read, user-library-modify, user-read-playback-state, user-modify-playback-state
- Request
"https://accounts.spotify.com/authorize?client_id=2ed3341a16894348b0577b13b7987837&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

- Response
  - Code: Needs to be converted to Access Token & Refresh Token

