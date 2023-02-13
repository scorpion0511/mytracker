import Button from 'react-bootstrap/Button';
import ROW from 'react-bootstrap/ROW'; 
import COL from 'react-bootstrap/COL'; 
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

const Footer = (props) => {
    return (
        <Container className= {props.className}>
        <ROW >
          <COL >
            <Button className="text-uppercase" variant="success">add</Button>
            </COL><COL >
            <Button className="text-uppercase" variant="primary">update</Button>
            </COL><COL >
            <Button className="text-uppercase" variant="warning">clear</Button>
            </COL><COL >
            <Button className="text-uppercase" variant="dark">next</Button>
          </COL>
          </ROW>
         
            <div className="calculate">
            
          <Button  className="text-uppercase btn-lg" variant="danger">calculate</Button>
         </div>
        
        </Container>
    );
}

export default Footer;
