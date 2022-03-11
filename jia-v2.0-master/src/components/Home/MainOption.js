import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody, Col} from 'reactstrap';

//Get value of language from local storage
let lang = localStorage.getItem("language") 

export default class MainOption extends Component {
  state = {collapse: false};

  toggle = () => {
    this.setState({collapse: !this.state.collapse});
  };

  render() {
    return (
      <Col xs="12" md="6" lg="4">
        <Card className='card-style text-left'>
          <div className="card-img-container">
            <CardImg className='cardImg' top width="100%" src={require(`../../img/${this.props.desc.img}`)}
                     alt={this.props.desc.alt}/>
          </div>
          <CardBody>
            <CardTitle tag="h5" className="card-title-intro">{lang === "English" ? this.props.desc.title : this.props.desc.fr_title}</CardTitle>
            <div className="underline"></div>
            <CardText>{lang === "English" ? this.props.desc.description : this.props.desc.fr_description}</CardText>
          </CardBody>
        </Card>
      </Col>
    )
  }
}
