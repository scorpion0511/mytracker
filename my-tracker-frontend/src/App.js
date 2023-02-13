import './App.css';
import Footer from './footer/Footer';
import Main from './main/Main';
import Header from './header/Header';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';


function App() {
  return (
    <Container>
      <Header className="w-50 general-border" version="Version 1.0"/>
      <Main className="w-50 general-border" />
      <Footer className="w-50 general-border" />
    </Container>
  );
}

export default App;
