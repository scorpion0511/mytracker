import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ROW from 'react-bootstrap/ROW'; 
import COL from 'react-bootstrap/COL'; 

const Header = (props) => {
  const ver = <span style={{'fontSize': '0.3em',"color" :"red" }}>[Version: 1.0]</span>;
    return (
      <Container className={props.className}>
        <ROW>
          <COL>   
            <h3 className='topParag'>Time Tracker{ver}</h3>
          </COL>
          <COL className= "text-center"><p className='topParag'>{props.version}</p></COL>
          <COL className="right">
            <Image src="logo.jpg" className="logo" thumbnail />
          </COL>
        </ROW>
      </Container>
    );
}

export default Header;