import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

const Footer = (props) => {

    return (
      <Container className = {props.className} >
             <Button className="text-uppercase  btn-outline-primary gap" variant='none' onClick={props.add}>
              add
            </Button>
            <Button className="text-uppercase  btn-outline-danger gap" variant='none' onClick={props.update}>
              update
            </Button>
            <Button type="reset" className="text-uppercase  btn-outline-warning gap" variant='none'  onClick={props.clear}>
              clear
            </Button>
            <Button className="text-uppercase  btn-outline-dark gap" variant='none'>
              save
            </Button>

      </Container>
    );
}

export default Footer;
