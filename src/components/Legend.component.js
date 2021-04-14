import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

class Legend extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Container>
                <Row className={this.props.endAnimation ? 'alert' : ''}>
                    <Col sm={2}>
                        Time
                    </Col>
                    <Col sm={10}>
                        {this.props.time}
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={1} className="red">
                    </Col>
                    <Col sm={3}>
                        Infected
                    </Col>
                </Row>
                <Row>
                    <Col sm={1} className="green">
                    </Col>
                    <Col sm={3}>
                        Vaccinated
                    </Col>
                </Row>
                <Row>
                    <Col sm={1} className="purple">
                    </Col>
                    <Col sm={3}>
                        Masked
                    </Col>
                </Row>
                <Row>
                    <Col sm={1} className="orange">
                    </Col>
                    <Col sm={5}>
                        Vaccinated + Masked
                    </Col>
                </Row>
                <Row>
                    <Col sm={1} className="blue">
                    </Col>
                    <Col sm={3}>
                        Normal
                    </Col>
                </Row>
                <Row>
                    <Col sm={1} className="black">
                    </Col>
                    <Col sm={3}>
                        Quarantined
                    </Col>
                </Row>
                <Row>
                    <Col sm={1} className="gray">
                    </Col>
                    <Col sm={3}>
                        Immuned
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Legend;