import { useState } from 'react';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';

function PageFormNewVocabularies() {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    return (
        <>
            <Container className="w-50">
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group controlId='formType' as={Row} className='mb-3'>
                        <Form.Label column sm={4}>ประเภทคำศัพท์</Form.Label>
                        <Col sm={8}>
                            <Form.Select required aria-label='select type'>
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
                            <Form.Control type='text' required />
                            <Form.Control.Feedback type="invalid">
                                Must not be empty.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group controlId='formPronunciation' as={Row} className='mb-3'>
                        <Form.Label column sm={4}>คำอ่าน</Form.Label>
                        <Col sm={8}>
                            <Form.Control type='text' required />
                            <Form.Control.Feedback type="invalid">
                                Must not be empty.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group controlId='formThai' as={Row} className='mb-3'>
                        <Form.Label column sm={4}>คำแปล</Form.Label>
                        <Col sm={8}>
                            <Form.Control type='text' required />
                            <Form.Control.Feedback type="invalid">
                                Must not be empty.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group className='text-center'>
                        <Button variant='primary' type='sumbit' className='modalSubmit'>บันทึก</Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export default PageFormNewVocabularies;