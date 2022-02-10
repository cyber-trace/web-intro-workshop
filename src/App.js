import "./styles/App.css";
import Calculatrice from "./components/calculatrice";
import NavBar from "./components/navBar";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <div className="container">
        <NavBar />
        <Calculatrice />
        <Footer />
      </div>
    </div>
  );
}

export default App;
