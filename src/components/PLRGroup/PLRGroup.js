import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Notation, Midi } from 'react-abc';
import { InlineMath } from 'react-katex';
import MusicalClock from'../MusicalClock/MusicalClock';
import { C_MAJOR_TRIAD } from '../../utils/Constants';
import { convertToNotationTriad, mod } from '../../utils/Utils';

import './PLRGroup.css';

class PLRGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      triad: C_MAJOR_TRIAD,
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

  invertBy = (triad, inversion) => {
    const inversionVal = mod(parseInt(inversion), 12);
    const newTriad = triad.map(note =>  mod(-1*note + inversionVal, 12));
    return newTriad;
  }

  handleParallelOperation = () => {
    const { triad } = this.state;
    this.setState({triad: this.invertBy(triad, triad[0] + triad[2]) });
  }

  handleLeadingToneOperation = () => {
    const { triad } = this.state;
    this.setState({triad: this.invertBy(triad, triad[1] + triad[2]) });
  }

  handleRelativeOperation = () => {
    const { triad } = this.state;
    this.setState({triad: this.invertBy(triad, triad[0] + triad[1]) });
  }

  render() {
    const {
      triad,
      windowWidth,
      windowHeight,
    } = this.state;

    const triadNotation = `L:1\n[${convertToNotationTriad(triad)}]`;

    return (
      <Container className="PLRGroup">
        <Row className="row-title">
          <h1 className="title">Parallel, Leading Tone, Relative Group</h1>
        </Row>
        <Row className="blurb">
          Below is a visualization of the Parallel, Leading Tone, Relative Group. The tool starts off with a C major chord but allows the user to apply the operations to the chord, after they click the corresponding button, to yield another consonant chord. The operation will update the regular 12-gon diagram, showing the subset of pitch classes the operation yielded, and will display the corresponding musical chord. Finally, the user can play back the chord audio. An explanation of how the PLR group works is below the tool.
        </Row>
        <Row className="blurb">
          <p><b>IMPLEMENTATION NOTES</b>: chord presentation is not entirely correct. Although it is enharmonically equivalent (and will sound the same), the notation is not always correct. For example, a D major chord consists of pitches D, F#, A. However, here it is represented by the pitches D, G♭, A. For code simplicity, we restrict to only using flat notation. This is a known bug and may be fixed later if I have time.</p>
          <p>
            Furthermore, the tool below isn't well suited for small width screens. This is a known issue and may be fixed later.
          </p>
        </Row>
        <Row className="input-row">
          <Col className="left-col">
            <Button variant="dark" type="button" onClick={this.handleParallelOperation} className="pull-right"> Parallel </Button>
          </Col>
          <Col className="right-col"> 
            <Button variant="dark" type="button" onClick={this.handleLeadingToneOperation}> Leading Tone </Button>
          </Col>
          <Col className="right-col"> 
            <Button variant="dark" type="button" onClick={this.handleRelativeOperation}> Relative </Button>
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
          <p>Under music serialism, we can also move pitch class sets using three types of operations: parallel, leading tone, and relative. These operations rely on the inversion operation discussed in the T/I Group. The paper mentions that these operations create <i>contextual inversion</i> since the axis of reflection depends on the input triad.</p>
          <ul>
            <li>Parallel maps a major triad to its parallel minor triad
              <ul>
                <li>Here the operation can be thought of as <InlineMath math="P(y_1, y_2, y_3) = I_{y_1 + y_3} (y_1, y_2, y_3)"/>.</li>
                <li> In terms of musical serialism, note that the parallel operation ends up swapping the first and third pitch classes from the set. For example <InlineMath math="P(0, 4, 7) = (7, 3, 0)"/> maps a C major chord to a C minor chord, which is the corresponding parallel minor chord.</li>
                <li> From the paper, the axis of reflection for the parallel operation is spanned by <InlineMath math="(\frac{y_1 + y_3}{2}, \frac{y_1 + y_3}{2} + 6)"/>. For example, for <InlineMath math="P(0, 4, 7) = (7, 3, 0)"/>, the axis of reflection is (3.5, 9.5), so the line that goes from inbetween E♭ and E to inbetween A and B♭. </li>
              </ul>
            </li>
            <li>Leading tone maps a major triad to a minor triad by lowering the root by a semitone
              <ul>
                <li>Here the operation can be thought of as <InlineMath math="L(y_1, y_2, y_3) = I_{y_2 + y_3} (y_1, y_2, y_3)"/>.</li>
                <li> In terms of musical serialism, note that the leading tone operation ends up swapping the second and third pitch classes from the set. For example <InlineMath math="L(0, 4, 7) = (11, 7, 4)"/> maps a C major chord to an E minor chord.</li>
                <li> From the paper, the axis of reflection for the parallel operation is spanned by <InlineMath math="(\frac{y_2 + y_3}{2}, \frac{y_2 + y_3}{2} + 6)"/>. For example, for <InlineMath math="L(0, 4, 7) = (11, 7, 4)"/>, the axis of reflection is (5.5, 11.5), so the line that goes from inbetween F and G♭ to inbetween B and C. </li>
              </ul>
            </li>
            <li>Relative maps a major triad to its relative minor triad
              <ul>
                <li>Here the operation can be thought of as <InlineMath math="R(y_1, y_2, y_3) = I_{y_1 + y_2} (y_1, y_2, y_3)"/>.</li>
                <li> In terms of musical serialism, note that the leading tone operation ends up swapping the first and second pitch classes from the set. For example <InlineMath math="R(0, 4, 7) = (4, 0, 9)"/> maps a C major chord to an E minor chord.</li>
                <li> From the paper, the axis of reflection for the parallel operation is spanned by <InlineMath math="(\frac{y_1 + y_2}{2}, \frac{y_1 + y_2}{2} + 6)"/>. For example, for <InlineMath math="R(0, 4, 7) = (4, 0, 9)"/>, the axis of reflection is (2, 8), so the line that goes from D to A♭. </li>
              </ul>
            </li>
          </ul>
          <p>For completeness, the paper proved that <InlineMath math="LR"/> (order 12) can be thought of as <InlineMath math="s"/> (although the operation doesn't translate to a rotation by 30°) and that <InlineMath math="L"/> (order 2) can be thought of as <InlineMath math="t"/>. Also note that <InlineMath math="R(LR)^3 = P"/> and <InlineMath math="L(LR)L = tst = RL = s^{-1}"/>. Thus <InlineMath math="L"/> and <InlineMath math="R"/> generate the PLR Group and <InlineMath math="D_{12}"/>. The paper provides a more rigorous proof of this finding.</p>
        </Row>
      </Container>
    );
  }
}

export default PLRGroup;
