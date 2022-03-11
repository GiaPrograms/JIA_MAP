import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {FacebookIcon, TwitterIcon, FacebookShareButton, TwitterShareButton} from 'react-share';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    // TODO: Change url
    const shareUrl = "https://socialinnovationlab.github.io/jia/";

    //Get value of language from local storage
    let lang = localStorage.getItem("language")
    return (
        <div className="footer-container">
          <div className="footer-content">
            <div className="copyright-container">
              <p>© 2019 JIA OptionMap</p>
              <p>
                {lang === "English" ? "Designed and developed by SLiDE" : "Conçu et développé par SLiDE"}
                <i>{lang === "English" ? " visit: " : " visite: "}</i>
                <a href="https://slidelab7.ca" className="slide-link" target="_blank" rel="noopener noreferrer">slidelab.ca</a>
              </p>
            </div>
            <div className="social-media">
              <div className="social-media-text">
                <p>{lang === "English" ? "Share on:" : "Partager sur:"}</p>
              </div>
              <div className="social-media-icons-container">
                <FacebookShareButton className="social-icon" size={46} round={true} url={shareUrl}>
                  <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>
                <TwitterShareButton className="social-icon" size={46} round={true} url={shareUrl}>
                  <TwitterIcon size={32} round={true}/>
                </TwitterShareButton>
              </div>
            </div>

            <div className="disclaimer-container">
              <p onClick={this.toggle}>{lang === "English" ? "Disclaimer" : "Avertissement:"}</p>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{lang === "English" ? "Disclaimer" : "Avertissement:"}</ModalHeader>
                <ModalBody> 
                {lang === "English" ? 
                  "This app was built by a team of researchers, clinicians and patient partners from various universities, health centres, research groups and patient associations, with funding from The Arthritis Society, the Chronic Pain Network, the Ontario Ministry of Research, Innovation and Science, and the Children's Hospital of Eastern Ontario Research Institute. The information contained in this app, whether in text, visuals or links, does not constitute clinical recommendations, and is for informational purposes only. You should contact your health care providers for medical advice and more in depth information on treatment options. This app was last updated on May 18, 2015 and there may be new studies that may affect the information provided. The findings of new studies will be incorporated in future versions of the app. For more information on how this app was developed and how information is sourced, please consult the “Methods” document linked in the app. Use of any treatment options suggested in this app is at the reader’s discretion, and at their own risk." : 
                  "Cette application a été conçue par une équipe de chercheurs, de cliniciens et de patients partenaires provenant de plusieurs universités, établissements de santé, groupes de recherche et associations de patients. Elle a été réalisée grâce au financement de la Société de l’arthrite, du Réseau de la douleur chronique, du ministère de la Recherche, de l’Innovation et des Sciences de l’Ontario, et de l’Institut de recherche du Centre hospitalier pour enfants de l’est de l’Ontario. Les informations contenues dans cette application, tant les textes et les visuels que les liens, ne constituent pas des recommandations cliniques et sont à titre informatif seulement. Vous devez contacter vos professionnels de la santé pour obtenir des avis médicaux et des informations plus détaillées sur les options de traitement. La dernière mise à jour de cette application a été effectuée le 18 mai 2015 et de nouvelles études pourraient modifier les informations qui y sont fournies. Les résultats de nouvelles études seront intégrés dans les prochaines versions de l’application. Pour en savoir plus sur le développement de l’application et la provenance des informations, veuillez consulter le document “Méthodes” lié dans l’application. L’utilisation des options de traitement suggérées dans cette application est à la discrétion du lecteur et à ses propres risques."}
                </ModalBody>
                <ModalFooter>
                  <Button className="next-btn" onClick={this.toggle}>{lang === "English" ? "Got it" : "J’ai compris"}</Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
    )
  }
}
