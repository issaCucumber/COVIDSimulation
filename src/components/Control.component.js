import React from 'react';
import { Col, Form, Button, Container, Row } from 'react-bootstrap';
import '../App.css';

class Control extends React.Component {

    _updateField = (e) => {
        var field = e.target.id;
        var value = parseInt(e.target.value);

        if(e.target.type == "checkbox") {
            value = e.target.checked;
        }

        switch(field){
            case "width":
                this.setState({width: value});
                break;
            case "height":
                this.setState({height: value});
                break;
            case "population":
                this.setState({population: value});
                break;
            case "vaccinated":
                this.setState({vaccinated: value});
                break;
            case "masked":
                this.setState({masked: value});
                break;
            case "vaccine_success":
                this.setState({vaccine_success: value});
                break;
            case "mask_success":
                this.setState({mask_success: value});
                break;
            case "incubation_period":
                this.setState({incubation_period: value});
                break;
            case "quarantine_mode":
                this.setState({quarantine_mode: value});
                break;
            case "recovery_period":
                this.setState({recovery_period: value});
                break;
            default:
                break;
        }
        
    };

    _submitChange = (e) => {
        this.props.setCallback(this.state);
    }

    constructor(props) {
        super(props);
        this.props = props;
        this.state = props.defaultstate;
    }

    render() {

        return (
            <Container>
                <Form>
                    <Form.Row className="align-items-center">
                        <Col xs={4}>
                            <Form.Label>Constraint: width</Form.Label>
                            <Form.Control 
                            className="mb-2"
                            id="width" 
                            type="number"
                            min="800" 
                            max="10000"
                            step="10"
                            value={this.state.width}
                            onChange={this._updateField}  />
                        </Col>
                        <Col xs={4}>
                            <Form.Label>Constraint: height</Form.Label>
                            <Form.Control 
                            className="mb-2"
                            id="height" 
                            type="number"
                            min="800" 
                            max="10000"
                            step="10"
                            value={this.state.height}
                            onChange={this._updateField}  />
                        </Col>
                    </Form.Row>
                    <Form.Row className="align-items-center">
                        <Col xs={4}>
                            <Form.Label>Population</Form.Label>
                            <Form.Control 
                            className="mb-2"
                            id="population" 
                            type="number"
                            min="1" 
                            max="1000000"
                            step="1"
                            value={this.state.population}
                            onChange={this._updateField}  />
                        </Col>
                    </Form.Row>
                    <Form.Row className="align-items-center">
                        <Col xs={4}>
                            <Form.Label>Vaccinated % = {this.state.vaccinated}</Form.Label>
                            <Form.Control 
                            className="mb-2"
                            id="vaccinated" 
                            max="100" 
                            min="0"
                            type="range"
                            step="1"
                            defaultValue={this.state.vaccinated}
                            onChange={this._updateField} />
                        </Col>
                    </Form.Row>
                    <Form.Row className="align-items-center">
                        <Col xs={4}>
                            <Form.Label>Masked % = {this.state.masked}</Form.Label>
                            <Form.Control 
                            className="mb-2"
                            id="masked" 
                            max="100" 
                            min="0"
                            type="range"
                            step="1"
                            defaultValue={this.state.masked} 
                            onChange={this._updateField} />
                        </Col>
                    </Form.Row>
                    <Form.Row className="align-items-center">
                        <Col xs={4}>
                            <Form.Label>Vac Effect % = {this.state.vaccine_success}</Form.Label>
                            <Form.Control 
                            id="vaccine_success" 
                            type="range" 
                            max="100" 
                            min="50"
                            step="1"
                            defaultValue={this.state.vaccine_success}
                            onChange={this._updateField} />
                        </Col>
                    </Form.Row>
                    <Form.Row className="align-items-center">
                        <Col xs={4}>
                            <Form.Label>Mask Effect % = {this.state.mask_success}</Form.Label>
                            <Form.Control 
                            id="mask_success" 
                            type="range" 
                            max="100" 
                            min="0"
                            step="1"
                            defaultValue={this.state.mask_success}
                            onChange={this._updateField} />
                        </Col>
                    </Form.Row>
                    <br/>
                    <Form.Row>
                        <Form.Check
                        type="checkbox"
                        id="quarantine_mode"
                        label="Quarantine Mode"
                        defaultChecked={this.state.quarantine_mode}
                        onChange={this._updateField}
                        />
                    </Form.Row>
                    <br/>
                    <Form.Row>
                        <Col xs={4}>
                            <Form.Label>Incubation Period <br/> (in ticks)</Form.Label>
                            <Form.Control 
                                className="mb-2"
                                id="incubation_period" 
                                type="number"
                                min="0" 
                                max="10000"
                                step="1"
                                value={this.state.incubation_period}
                                onChange={this._updateField}  />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col xs={4}>
                            <Form.Label>Recovery Period <br/> (in ticks)</Form.Label>
                            <Form.Control 
                                className="mb-2"
                                id="recovery_period" 
                                type="number"
                                min="1" 
                                max="10000"
                                step="1"
                                value={this.state.recovery_period}
                                onChange={this._updateField}  />
                        </Col>
                    </Form.Row>
                    <br/>
                    <Form.Row>
                        <Button 
                        type="button"
                        className="mb-5" 
                        onClick={this._submitChange}>Reset & Restart</Button>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

export default Control;