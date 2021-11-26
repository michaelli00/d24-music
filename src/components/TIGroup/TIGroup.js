import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Notation, Midi } from 'react-abc';
import { InlineMath } from 'react-katex';
import MusicalClock from'../MusicalClock/MusicalClock';
import { C_MAJOR_TRIAD } from '../../utils/Constants';
import { convertToNotationTriad, mod } from '../../utils/Utils';
import './TIGroup.css';

class TIGroup extends React.Component {
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
    this.setState({ 
      windowWidth: window.innerWidth, 
      windowHeight: window.innerHeight 
    });
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
      triad,
      transposition,
      inversion,
      windowWidth,
      windowHeight,
    } = this.state;

    const triadNotation = `L:1\n[${convertToNotationTriad(triad)}]`;
    return (
      <Container className="TIGroup" fluid>
        <Row className="row-title">
          <h1 className="title">Transposition/Inversion Group</h1>
        </Row>
        <Row className="blurb">
          <p>Under music serialism, we can move pitch class sets using two types of operations: transposition and inversion</p>
          <ul>
            <li> Transpositions move pitch classes up and down. 
              <ul>
                <li>Here the operation can be thought of as <InlineMath math="T_n: Z_{12} \rightarrow Z_{12}"/> where <InlineMath math="T_n(x) = x + n \pmod{12}"/>.</li>
                <li> In terms of music, this means we add n to the pitch class. For example <InlineMath math="T_4(0) = 4"/> corresponds to tranposing the note C to the note E.</li>
                <li> When working with triads and pitch class sets, transposition is applied to each pitch class in the pitch class set. For example, <InlineMath math="T_4((0, 4, 7)) = (4, 8, 11)"/> corresponds to transposing a C major chord to an E major chord. Important thing to note is that transposition is closed under consonant chords.</li>
                <li> Under <InlineMath math="D_{24}"/>, the operation <InlineMath math="T_n"/> can be thought of as rotating a 12-gon by 30°.</li>
              </ul>
            </li>
            <li> Inversions reflect pitch classes over a fixed axis.
              <ul>
                <li>Here the operation can be thought of as <InlineMath math="I_n: Z_{12} \rightarrow Z_{12}"/> where <InlineMath math="I_n(x) = -x + n \pmod{12}"/>.</li>
                <li> In terms of music, this means we add n to the pitch class' inverse. For example <InlineMath math="I_6(2) = 4"/> corresponds to transforming the note D to the note E.</li>
                <li> When working with triads and pitch class sets, inversion is applied to each pitch class in the pitch class set. For example, <InlineMath math="I_0((0, 4, 7)) = (0, 8, 5)"/> corresponds to transforming a C major chord into a F minor chord. Important thing to note is that inversion is closed under consonant chords.</li>
                <li> Under <InlineMath math="D_{24}"/>, the operation <InlineMath math="I_n"/> can be thought of as reflecting over a particular axis. For example, <InlineMath math="I_0"/> can be thought of reflecting over the vertical axis.</li>
              </ul>
            </li>
          </ul>
        </Row>
        <Row className="blurb">
          Below is a visualization of the Transposition/Inversion Group. The tool starts off with a C major chord but allows the user to apply serial transposition and inversion to the chord, after they click the corresponding button, to yield another consonant chord. The operation will update the 12-gon diagram, showing the subset of pitch classes the operation yielded, and will display the corresponding musical chord. Finally, the user can play back the chord audio.
        </Row>
        <Row className="blurb">
          <p><b>KNOWN ISSUES/THINGS TO FIX</b>: chord presentation is not entirely correct. Although it is enharmonically equivalent, the notation is not correct. For example, a D♭ (or C#) major chord is represented by the pitches C#, F, A♭. This is a known bug and will be fixed later.</p>
          <p>
            Furthermore, sanization for tranposition and inversion input has NOT be implemented so it will accept strings and break the app. Input should be limited to integer values.
          </p>
        </Row>
        <Row className="input-row">
          <Col md={6} className="left-col">
            <Form>
              <Form.Group className="mb-3" controlId="transposeNumber">
                <Form.Label className="form-label">Transpose by</Form.Label>
                <span className="form-row">
                  <Form.Control 
                    type="number"
                    value={transposition}
                    onChange={e => this.setState({transposition: e.target.value})}
                  />
                  <Button variant="primary" type="button" onClick={this.handleTranspose} className="pull-right">
                    Transpose
                  </Button>
                </span>
              </Form.Group>
            </Form>
          </Col>
          <Col md={6} className="right-col"> 
            <Form>
              <Form.Group className="mb-3" controlId="inversionNumber">
                <Form.Label className="form-label">Invert by</Form.Label>
                <span className="form-row">
                  <Form.Control 
                    type="number"
                    value={inversion}
                    onChange={e => this.setState({inversion: e.target.value})}
                  />
                  <Button variant="primary" type="button" onClick={this.handleInversion}>
                    Invert
                  </Button>
                </span>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <MusicalClock
              windowWidth={windowWidth}
              windowHeight={windowHeight}
              triad={triad}
            />
          </Col>
          <Col className="notation-col">
            <Notation
              engraverParams={{scale: 3}}
              notation={triadNotation} 
            />
            <Midi
              key={triadNotation}
              notation={triadNotation}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TIGroup;
