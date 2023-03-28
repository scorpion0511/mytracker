import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

const Footer = (props) => {

    return (
      <Container className = {props.className} >
            <Button className="text-uppercase  btn-outline-danger gap" variant='none' onClick={props.update}>
              add/update
            </Button>
            <Button className="text-uppercase  btn-outline-warning gap" variant='none'  onClick={props.clear}>
              clear
            </Button>
            
      </Container>
    );
}

export default Footer;
