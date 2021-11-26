import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './PLRGroup.css';

class PLRGroup extends React.Component {
  render() {
    return (
      <Container className="PLRGroup" fluid>
        <Row className="row-title">
          <h1 className="title">Parallel, Leading Tone, Relative Group</h1>
        </Row>
        <Row className="blurb"> WORK IN PROGRESS</Row>
      </Container>
    );
  }
}

export default PLRGroup;
