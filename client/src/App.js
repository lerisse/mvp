import './App.css';
import SpotifyLogin from './SpotifyLogin';
import Search from './Search';
import MusicPlayer from './MusicPlayer';
import SearchResults from './SearchResults';

function App() {
  return (
      <div>
        <SpotifyLogin />
        <Search />
        <MusicPlayer />
        <SearchResults />
      </div>
    )
}

export default App;
