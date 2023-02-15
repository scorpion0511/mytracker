import Button from 'react-bootstrap/Button';
import ROW from 'react-bootstrap/ROW'; 
import COL from 'react-bootstrap/COL'; 
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

const Footer = (props) => {

    return (
      <Container className = {props.className} >
             <Button className="text-uppercase  btn-outline-primary gap" variant='none' onClick={props.callback}>
              add
            </Button>
            <Button className="text-uppercase  btn-outline-success gap" variant='none'>
              update
            </Button>
            <Button type="reset" className="text-uppercase  btn-outline-warning gap" variant='none'>
              clear
            </Button>
            <Button className="text-uppercase  btn-outline-dark" variant='none'>
              save
            </Button>
          
       
        <div className="calculate">
          <Button className="text-uppercase btn-bg btn-outline-danger"  variant='none'>
            calculate
          </Button>
        </div>
      </Container>
    );
}

export default Footer;
