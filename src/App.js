import Header from './components/header';
import MessageForm from './components/messageForm';
import ShowMessages from './components/showMessages';
import UpdateMessageOverlay from './components/editMessage';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="headercont">
        <Header />
        <div className="btncont">
          <MessageForm />
          <UpdateMessageOverlay />
        </div>
      </div>

      <ShowMessages />
    </div>
  );
}

export default App;
