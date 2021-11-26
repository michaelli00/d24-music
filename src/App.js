import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { NavLink } from "react-router-dom";
import { InlineMath } from 'react-katex';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Container className="App">
        <Row className="row-title">
          <h1 className="title">Group Actions on Music</h1>
        </Row>
        <Row className="blurb">
          <p>This webapp contains tools that explore the group actions of music on the Dihedral group <InlineMath math="D_{12}"/> discussed in <i>Musical Actions on Dihedral Groups</i> (paper can be found <a href="https://arxiv.org/abs/0711.1873" target="_blank">here</a>). In particular, the tools allow users to play around with group operations, visualize the group actions, and listen to the musical output.</p>
        </Row>
        <Row className="blurb">
          <p>For a brief, high level discussion of <InlineMath math="D_{12}"/>, the Dihedral group of order 24, it is generated by two elements: <InlineMath math="s"/> and <InlineMath math="t"/></p>

          <ul>
            <li> <InlineMath math="s"/> can be thought of as rotating a vertex of a regular polygon to another vertex. In the case of <InlineMath math="D_{12}"/>, <InlineMath math="s"/> has order 12. </li>
            <li> <InlineMath math="t"/> can be thought of as reflecting a regular polygon over an axis. For any Dihedral group, <InlineMath math="t"/> has order 2. </li>
            <li> Note that <InlineMath math="tst = s^{-1}"/>. Thus, <InlineMath math="s"/> and <InlineMath math="t"/> generate any Dihedral group. </li>
          </ul>
        </Row>
        <Row className="blurb">
          <p>For a brief, high level discussion of Serialism, the music analysis technique used in the paper, notes can be partioned into pitch classes. An octave can be divided into 12 semitone pitch classes. Thus we can operate on notes under modulo 12. For example</p>
          <ul>
            <li> The note C corresponds with the number 0, C# corresponds with the number 1, and G corresponds with the number 7.</li>
            <li> If we "add" C# and G together, we get <InlineMath math="1 + 7 = 8"/>, which corresponds with the note A♭. </li>
            <li> If we "add" G and G together, we get <InlineMath math="7 + 7 \equiv 2 \pmod{12}"/>, which corresponds with the note D. </li>
            <li> Note that enharmonic notes correspond to the same pitch class, so G# and A♭ both correspond with the pitch class 8. </li>
            <li> Also note that notes that are octaves apart belong to the same pitch class.</li>
          </ul>
        </Row>
        <Row className="blurb">
          <p>One last thing to note is that the paper and this webapp focus on consonant triads (i.e. major and minor triads). These triads can be seen as subsets of the pitch classes. For example</p>
          <ul>
            <li> The C major triad consists of pitch classes (0, 4, 7) </li>
            <li> The C minor triad consists of pitch classes (0, 3, 7) </li>
          </ul>

        </Row>
        <Row className="blurb">
          <p className="link-paragraph">Below are links to the tools I developed for the T/I Group and PLR Group discussed in the paper (also can be navigated to from the navbar on top)</p>
          <ul>
            <li> <NavLink to="/ti" className="nav-link">T/I Group</NavLink></li>
            <li> <NavLink to="/plr" className="nav-link">PLR Group</NavLink> </li>
          </ul>
        </Row>
        <Row className="blurb">
          <p> This webapp was developed using React and react-abc, a javascript library for rendering music using abc music notation (<a href="https://github.com/fuhton/react-abc" target="_blank">https://github.com/fuhton/react-abc</a>).</p>
          <p>Source code can be found <a href="https://github.com/michaelli00/d24-music" target="_blank">here</a>.</p>
        </Row>

      </Container>
    );
  }
}

export default App;
