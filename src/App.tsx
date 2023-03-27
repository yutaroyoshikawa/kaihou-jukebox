import "./App.css";
import { SpotifyPlayer } from "./spotify/SpotifyPlayer";
import { SpotifyPlayerProvider } from "./spotify/SpotifyPlayerProvider";

function App() {
	return <SpotifyPlayerProvider><SpotifyPlayer /></SpotifyPlayerProvider>;
}

export default App;
