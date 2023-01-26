import './App.css';
import ContactForm from "./component/sections/ContactForm";

import image from "./img/blue-abstract-gradient-wave-wallpaper.jpg"; 


function App() {
  return (
    <div className="App bg-style" style={{ backgroundImage:`url(${image})` }}>
      <h1>DAG (Directed Acyclic Graph) Implementation</h1>
      <hr/>
      <p></p>
      <ContactForm />
    </div>
  );
}

export default App;
