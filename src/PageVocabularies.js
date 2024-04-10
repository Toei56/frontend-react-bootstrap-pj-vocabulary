import './PageVocabularies.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal, Form, Row, Col, Popover, OverlayTrigger, FloatingLabel} from "react-bootstrap";

function PageVocabularies() {

    // show modal
    const [showModal, setShowModal] = useState(false);
    // const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);


    // show alert add, update, delete
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState();
    const [alertMessage, setAlertMessage] = useState();

    function showAlertMessage(variant, message) {
        setShowAlert(true);
        setAlertVariant(variant);
        setAlertMessage(message);

        setTimeout(() => {
            setShowAlert(false)
        }, 5000);
    }

    // api
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        eng: '',
        pronunciation: '',
        thai: ''
    });

    // api get
    useEffect(() => {
        axios.get('http://localhost:1150/vocabulary')
            .then(response => setData(response.data))
            console.log(setData);
    }, []);

    const handleAdd = () => {
        setShowModal(true);
        setEditMode(false);
    }

    const handleEdit = (id) => {
        const item = data.find((item) => item.id === id);
        setFormData(item);
        setEditMode(true);
        setEditId(id);
        setShowModal(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editMode) {
            axios.put(`http://localhost:1150/vocabulary/${editId}`, formData)
                .then((response) => {
                    console.log(response);
                    const updateData = data.map((item) => {
                        if (item.id === editId) {
                            return response.data;
                        }
                        return item;
                    });
                    setData(updateData);
                    setShowModal(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.post('http://localhost:1150/vocabulary', formData)
                .then((response) => {
                    console.log(response);
                    setData([...data, response.data]);
                    setShowModal(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    // ---

    // api delete
    const handleDelete = (id) => {
        axios.delete(`http://localhost:1150/vocabulary/${id}`)
            .then((response) => {
                if (response.status === 204) {
                    console.log('Data deleted successfully!');
                    setData(data.filter(item => item.id !== id));
                    showAlertMessage('danger', 'Data deleted successfully!');
                }

            })
            .catch(error => console.log("Delete : " + error));
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Test Popover</Popover.Header>
            <Popover.Body>
                <strong>Coming soon.</strong>
            </Popover.Body>
        </Popover>
    );

    // search
    const [search, setSearch] = useState('');
    const filteredData = data.filter(item => item.eng.includes(search));

    return (
        <>
            <Container id='showAlert' className='w-25'>
                {showAlert &&
                    <Alert variant={alertVariant} dismissible>
                        {alertMessage}
                    </Alert>
                }
            </Container>

            {/* <Container>
                <Button variant="success" onClick={handleAdd}>
                    เพิ่มคำศัพท์
                </Button>
            </Container> */}

            <Container>
                <FloatingLabel
                    controlId="floatingInput"
                    label="ค้นหาคำศัพท์"
                    className="mb-3"
                >
                    <Form.Control type="search" value={search} onChange={e => setSearch(e.target.value)}/>
                </FloatingLabel>
            </Container>

            <Container id="table-vocabularies">
                <Table striped bordered responsive hover >
                    <thead className="table-dark">
                        <tr>
                            <th>ประเภท</th>
                            <th>คำศัพท์</th>
                            <th>คำอ่าน</th>
                            <th>คำแปล</th>
                            <th>แก้ไข</th>
                            <th>ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <tr key={item.id}>
                                <td>{item.type}</td>
                                <td>{item.eng}</td>
                                <td>{item.pronunciation}</td>
                                <td>{item.thai}</td>
                                <td>
                                    {/* onClick={() => handleEdit(item.id)} */}
                                    <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
                                        <Button variant="outline-warning">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                    </OverlayTrigger>
                                </td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => handleDelete(item.id)}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            {/* modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'แก้ไขข้อมูล' : 'เพิ่มคำศัพท์'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {data && (
                        <Form id='form-new-vocabulary' onSubmit={handleSubmit}>
                            <Form.Group controlId='formType' as={Row} className='mb-3'>
                                <Form.Label column sm={4}>ประเภทคำศัพท์</Form.Label>
                                <Col sm={8}>
                                    <Form.Select required aria-label='select type'
                                        name='type'
                                        value={formData.type}
                                        onChange={handleChange}>
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
                                    <Form.Control required
                                        type='text'
                                        name='eng'
                                        value={formData.eng}
                                        onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Must not be empty.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group controlId='formPronunciation' as={Row} className='mb-3'>
                                <Form.Label column sm={4}>คำอ่าน</Form.Label>
                                <Col sm={8}>
                                    <Form.Control required
                                        type='text'
                                        name='pronunciation'
                                        value={formData.pronunciation}
                                        onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Must not be empty.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group controlId='formThai' as={Row} className='mb-3'>
                                <Form.Label column sm={4}>คำแปล</Form.Label>
                                <Col sm={8}>
                                    <Form.Control required
                                        type='text'
                                        name='thai'
                                        value={formData.thai}
                                        onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Must not be empty.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group className='text-center'>
                                <Button variant='primary' type='sumbit' className='modalSubmit' >
                                    บันทึก
                                </Button>
                                <Button variant='secondary' type='button' onClick={handleCloseModal}>
                                    ปิด
                                </Button>
                            </Form.Group>
                        </Form>
                    )}
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

export default PageVocabularies;