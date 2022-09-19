import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const AddContactForm = (props: any) => {
    const formInitialDetails = {
      name: '',
      email: '',
      phone: '',
      website: '',
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);

    const onFormUpdate = (category: any, value: any) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        props.handleSubmit(formDetails)
        props.addContact()
        setFormDetails(formInitialDetails)
    };

    return (
        <section className="contact align-contents-center" id="contact" >
            <Container >
                <Row className="align-items-center" >
                    <Col md={6} >
                        <h2>Add Contact</h2>
                        <form onSubmit={handleSubmit} >
                            <Row>
                                <Col sm={12} className="px-2" >
                                    <input type="text" value={formDetails.name} placeholder="Name" onChange={(e) => onFormUpdate('name', e.target.value)} />
                                </Col>
                                <Col sm={12} className="px-2" >
                                    <input type="email" value={formDetails.email} placeholder="Email" onChange={(e) => onFormUpdate('email', e.target.value)} />
                                </Col>
                                <Col sm={12} className="px-2" >
                                    <input type="tel" value={formDetails.phone} placeholder="Phone Number" onChange={(e) => onFormUpdate('phone', e.target.value)} />
                                </Col>
                                <Col sm={12} className="px-2" >
                                    <input type="text" value={formDetails.website} placeholder="Website" onChange={(e) => onFormUpdate('website', e.target.value)} />
                                </Col>
                            </Row>
                            <button type="submit" className="btn btn-success" >Add</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
