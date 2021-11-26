import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MusicalClock from'./components/MusicalClock/MusicalClock';
import { C_MAJOR_TRIAD } from './utils/Constants';
import { mod } from './utils/Utils';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      triad: C_MAJOR_TRIAD,
      transposition: 0,
      inversion: 0,
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  }
  
  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  handleTranspose = () => {
    const { triad, transposition } = this.state;
    const transpositionVal = mod(parseInt(transposition), 12);
    const newTriad = triad.map(note => (note + transpositionVal) % 12);
    this.setState({ triad: newTriad });
  }

  handleInversion = () => {
    const { triad, inversion } = this.state;
    const inversionVal = mod(parseInt(inversion), 12);
    const newTriad = triad.map(note =>  mod(-1*note + inversionVal, 12));
    this.setState({ triad: newTriad });
  }

  render() {
    const {
      windowWidth,
      windowHeight,
      triad,
      transposition,
      inversion,
    } = this.state;
    return (
      <Container className="App">
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="transposeNumber">
                <Form.Label>Transpose by</Form.Label>
                <span className="form-row">
                  <Form.Control 
                    type="number"
                    value={transposition}
                    onChange={e => this.setState({transposition: e.target.value})}
                  />
                  <Button variant="primary" type="button" onClick={this.handleTranspose} className="pull-right">
                    Submit
                  </Button>
                </span>
              </Form.Group>
            </Form>
          </Col>
          <Col> 
            <Form>
              <Form.Group className="mb-3" controlId="inversionNumber">
                <Form.Label>Invert by</Form.Label>
                <span className="form-row">
                  <Form.Control 
                    type="number"
                    value={inversion}
                    onChange={e => this.setState({inversion: e.target.value})}
                  />
                  <Button variant="primary" type="button" onClick={this.handleInversion}>
                    Submit
                  </Button>
                </span>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <MusicalClock
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          triad={triad}
        />
      </Container>
    );
  }
}

export default App;
