import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 

const Header = (props) => {
  const ver = <span style={{'fontSize': '0.3em',"color" :"red" }}>[Version: 1.0]</span>;
    return (
      <Container className={props.className}>
        <Row>
          <Col>   
            <h3 className='topParag'>Task Tracker{ver}</h3>
          </Col>
          <Col className= "text-center"><p className='topParag'>{props.version}</p></Col>
          <Col className="right">
            <Image src="logo.png" className="logo" thumbnail />
          </Col>
        </Row>
      </Container>
    );
}

export default Header;