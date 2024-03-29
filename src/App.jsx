import { useRef, useEffect } from 'react';
import './assets/styles/styles.css'
import SwitchRoute from './routes';
// import { io } from 'socket.io-client';
// const socket = io.connect('http://localhost:80')
function App() {
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0
      });
    };
    document.addEventListener('load', handleScrollToTop, true);
    return () => {
      document.removeEventListener('load', handleScrollToTop, true);
    };
  }, []);
  // console.log('app render')
  return (
    <div>
      <SwitchRoute />
    </div>
  );
}

export default App;
