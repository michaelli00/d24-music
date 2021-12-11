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
    if (transposition === '' || isNaN(transposition)) {
      alert("Please enter an integer for transposition");
    } else {
      const transpositionVal = mod(parseInt(transposition), 12);
      const newTriad = triad.map(note => (note + transpositionVal) % 12);
      this.setState({ triad: newTriad });
    }
  }

  handleInversion = () => {
    const { triad, inversion } = this.state;
    if (inversion === '' || isNaN(inversion)) {
      alert("Please enter an integer for inversion");
    } else {
      const inversionVal = mod(parseInt(inversion), 12);
      const newTriad = triad.map(note =>  mod(-1*note + inversionVal, 12));
      this.setState({ triad: newTriad });
    }
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
      <Container className="TIGroup">
        <Row className="row-title">
          <h1 className="title">Transposition/Inversion Group</h1>
        </Row>
        <Row className="blurb">
          Below is a visualization of the Transposition/Inversion Group. The tool starts off with a C major chord but allows the user to apply serial transposition and inversion to the chord, after they click the corresponding button, to yield another consonant chord. The operation will update the regular 12-gon diagram, showing the subset of pitch classes the operation yielded, and will display the corresponding musical chord. Finally, the user can play back the chord audio. An explanation of how the P/I group works is below the tool.
        </Row>
        <Row className="blurb">
          <p><b>IMPLEMENTATION NOTES</b>: chord presentation is not entirely correct. Although it is enharmonically equivalent (and will sound the same), the notation is not always correct. For example, a D major chord consists of pitches D, F#, A. However, here it is represented by the pitches D, G♭, A. For code simplicity, we restrict to only using flat notation. This is a known bug and may be fixed later if I have time.</p>
          <p>
            Furthermore, the tool below isn't well suited for small width screens. This is a known issue and may be fixed later.
          </p>
        </Row>
        <Row className="input-row">
          <Col className="left-col">
            <Form onSubmit={e => e.preventDefault()}>
              <Form.Group className="mb-3" controlId="transposeNumber">
                <Form.Label className="form-label">Transpose by</Form.Label>
                <span className="form-row">
                  <Form.Control 
                    type="number"
                    value={transposition}
                    onChange={e => this.setState({transposition: e.target.value})}
                  />
                  <Button variant="dark" type="button" onClick={this.handleTranspose} className="pull-right">
                    Transpose
                  </Button>
                </span>
              </Form.Group>
            </Form>
          </Col>
          <Col className="right-col"> 
            <Form onSubmit={e => e.preventDefault()}>
              <Form.Group className="mb-3" controlId="inversionNumber">
                <Form.Label className="form-label">Invert by</Form.Label>
                <span className="form-row">
                  <Form.Control 
                    type="number"
                    value={inversion}
                    onChange={e => this.setState({inversion: e.target.value})}
                  />
                  <Button variant="dark" type="button" onClick={this.handleInversion}>
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
        <Row className="blurb">
          <p>Under music serialism, we can move pitch class sets using two types of operations: transposition and inversion</p>
          <ul>
            <li> Transpositions move pitch classes up and down. 
              <ul>
                <li>Here the operation can be thought of as <InlineMath math="T_n: Z_{12} \rightarrow Z_{12}"/> where <InlineMath math="T_n(x) = x + n \pmod{12}"/>.</li>
                <li> In terms of music, this means we add n to the pitch class. For example <InlineMath math="T_4(0) = 4"/> corresponds to transposing the note C to the note E.</li>
                <li> When working with triads and pitch class sets, transposition is applied to each pitch class in the pitch class set. For example, <InlineMath math="T_4(0, 4, 7) = (4, 8, 11)"/> corresponds to transposing a C major chord to an E major chord. Important thing to note is that transposition is closed under consonant chords.</li>
                <li> Under <InlineMath math="D_{24}"/>, the operation <InlineMath math="T_n"/> can be thought of as rotating a regular 12-gon by 30°.</li>
              </ul>
            </li>
            <li> Inversions reflect pitch classes over a fixed axis.
              <ul>
                <li> For people unfamiliar with serial analysis, an important distinction here is that serial inversion is NOT the same as chord inversions. The paper and this webapp focus on serial inversions. </li>
                <li>Here the operation can be thought of as <InlineMath math="I_n: Z_{12} \rightarrow Z_{12}"/> where <InlineMath math="I_n(x) = -x + n \pmod{12}"/>.</li>
                <li> In terms of music, this means we add n to the pitch class' inverse. For example <InlineMath math="I_6(2) = 4"/> corresponds to transforming the note D to the note E.</li>
                <li> When working with triads and pitch class sets, inversion is applied to each pitch class in the pitch class set. For example, <InlineMath math="I_0(0, 4, 7) = (0, 8, 5)"/> corresponds to transforming a C major chord into a F minor chord. Important thing to note is that inversion is closed under consonant chords.</li>
                <li> Under <InlineMath math="D_{24}"/>, the operation <InlineMath math="I_n"/> can be thought of as reflecting over a particular axis. For example, <InlineMath math="I_0"/> can be thought of reflecting over the vertical axis.</li>
              </ul>
            </li>
          </ul>
          <p>For completeness, note that <InlineMath math="T_1"/> generates all possible <InlineMath math="T_n"/> (and has order 12) and that <InlineMath math="T_n I_0 = I_n"/>. Thus <InlineMath math="T_1"/> can be thought of as <InlineMath math="s"/> and <InlineMath math="I_0"/> can be thought of as <InlineMath math="t"/>, so they generate <InlineMath math="D_{12}"/>. The paper provides a more rigorous proof of this finding.</p>
        </Row>
      </Container>
    );
  }
}

export default TIGroup;
