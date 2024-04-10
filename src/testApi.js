import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';

const TestApi = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:1150/vocabulary');
            setData(response.data);
        };

        fetchData();
    }, []);

    // const handleAdd = async () => {
    //     const response = await axios.post('http://localhost:1150/vocabulary', { name: 'New Item' });
    //     setData([...data, response.data]);
    // };

    const handleEdit = async (id, eng) => {
        const response = await axios.put(`http://localhost:1150/vocabulary/${id}`, { eng });
        const updatedData = [...data];
        const index = updatedData.findIndex(item => item.id === id);
        updatedData[index] = response.data;
        setData(updatedData);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:1150/vocabulary/${id}`);
        const updatedData = [...data].filter(item => item.id !== id);
        setData(updatedData);
    };

    const filteredData = data.filter(item => item.eng.includes(search));

    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="ค้นหา..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </InputGroup>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ชื่อ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.eng}</td>
                            <td>
                                {/* <Button variant="primary" size="sm" onClick={() => handleEdit(item.id, item.name)}>Edit</Button>{' '} */}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="success">Add New Item</Button>
        </div>
    );
};

export default TestApi;