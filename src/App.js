import Header from './components/header';
import MessageForm from './components/messageForm';
import ShowMessages from './components/showMessages';
import UpdateMessageOverlay from './components/editMessage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MessageForm />
      <ShowMessages />
      <UpdateMessageOverlay />
    </div>
  );
}

export default App;
