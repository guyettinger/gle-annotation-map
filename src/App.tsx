import { Map } from './components';
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const App = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
    </div>
  )
};

export default App;
