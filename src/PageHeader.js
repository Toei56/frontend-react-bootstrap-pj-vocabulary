import axios from 'axios';
import './PageHeader.css';
import { useState } from 'react';
// import $, { event } from "jquery";
// import Bootstrap from 'bootstrap';
import { Button, Modal, Nav, Navbar, Container, Form, Row, Col, } from 'react-bootstrap';

function PageHeader() {
    // show modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // validate form new vocabulary and api post
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        // api post
        const formData = new FormData(form);
        
        axios.post('http://localhost:1150/vocabulary', formData)
            .then((response) => {
                console.log(formData);
                if (response.status === 201) {
                    window.location.href = '/PageHeader.js';
                }
                console.log('Form submitted successfully!', response);
            })
            .catch((error) => {
                console.log('Error submitting form:', error);
            });
    };

    return (
        <>
            <Container>
                <Row>
                    <Navbar className="bg-body-tertiary border-bottom" expand="xl">
                        <Col md={6}>
                            <Navbar.Brand href="/PageHeader.js">Vocaburary</Navbar.Brand>
                        </Col>
                        <Col md={6}>
                            <Nav className="social">
                                <Nav.Item>
                                    <Nav.Link href="#" target='_blank'><i className="fab fa-facebook-f"></i></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="https://github.com/Toei56" target='_blank'><i className="fa-brands fa-github"></i></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#" target='_blank'><i className="fab fa-instagram"></i></Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Navbar>
                </Row>
            </Container>

            <Container className='menu'>
                <Row className='align-items-center'>
                    <Col md={8}>
                        <Nav className='menu-item'>
                            <Nav.Item>
                                <Nav.Link href="/PageHeader.js">หน้าแรก</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#">คำศัพท์</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#">ติดต่อ</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={handleShow}>เพิ่มคำศัพท์</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={4} className='justify-content-end'>
                        <Form className="d-flex" >
                            <Form.Control
                                type="search"
                                placeholder="ค้นหาคำศัพท์"
                                aria-label="Search"
                                required
                            />
                            <Button type='submit' variant="outline-primary" onClick={() => console.log("Success")}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>


            {/* modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มคำศัพท์ใหม่</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate validated={validated}
                        onSubmit={handleSubmit}
                        id='form-new-vocabulary' >
                        <Form.Group controlId='formType' as={Row} className='mb-3'>
                            <Form.Label column sm={4}>ประเภทคำศัพท์</Form.Label>
                            <Col sm={8}>
                                <Form.Select required name='type' aria-label='select type'>
                                    <option value="">-</option>
                                    <option value="คำนาม">คำนาม</option>
                                    <option value="คำนำหน้าคำนาม">คำนำหน้าคำนาม</option>
                                    <option value="คำสรรพนาม">คำสรรพนาม</option>
                                    <option value="คำกริยา">คำกริยา</option>
                                    <option value="คำกริยาวิเศษณ์">คำกริยาวิเศษณ์</option>
                                    <option value="คำคุณศัพท์">คำคุณศัพท์</option>
                                    <option value="คำบุพบท">คำบุพบท</option>
                                    <option value="คำสันธาน">คำสันธาน</option>
                                    <option value="คำอุทาน">คำอุทาน</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Must not be empty.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId='formEng' as={Row} className='mb-3'>
                            <Form.Label column sm={4}>คำศัพท์</Form.Label>
                            <Col sm={8}>
                                <Form.Control type='text' required name='eng' />
                                <Form.Control.Feedback type="invalid">
                                    Must not be empty.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId='formPronunciation' as={Row} className='mb-3'>
                            <Form.Label column sm={4}>คำอ่าน</Form.Label>
                            <Col sm={8}>
                                <Form.Control type='text' required name='pronunciation' />
                                <Form.Control.Feedback type="invalid">
                                    Must not be empty.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId='formThai' as={Row} className='mb-3'>
                            <Form.Label column sm={4}>คำแปล</Form.Label>
                            <Col sm={8}>
                                <Form.Control type='text' required name='thai' />
                                <Form.Control.Feedback type="invalid">
                                    Must not be empty.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group className='text-center'>
                            <Button variant='primary' type='sumbit' className='modalSubmit'>บันทึก</Button>
                            <Button variant='secondary' type='button' onClick={handleClose}>ปิด</Button>
                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button href='#' variant="success" onClick={() => console.log("Add Vocabulary")}>
                        <i className="fa-solid fa-plus"></i> เพิ่มหลายคำ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PageHeader;