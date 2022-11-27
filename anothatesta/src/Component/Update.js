import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Update() {
    let history = useNavigate();
    const [breweryId, setBreweryId] = useState(null);
    const [breweryName, setBreweryName] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [breweryImg, setBreweryImg] = useState('');
    const [description, setDescription] = useState('');
    const[isActive, setIsActive] = useState('');
    const[address, setAddress] = useState('');
    const[city, setCity] = useState('');
    const[state, setState] = useState('');
    const[zip, setZip] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    useEffect(() => {
        setBreweryId(localStorage.getItem('Brewery Id'))
        setBreweryName(localStorage.getItem('Brewery Name'))
        setOwnerId(localStorage.getItem('Owner Id'))
        setBreweryImg(localStorage.getItem('Brewery Image'))
        setDescription(localStorage.getItem('Description'))
        setIsActive(localStorage.getItem('Is Active'))
        setAddress(localStorage.getItem('Address'))
        setCity(localStorage.getItem('City'))
        setState(localStorage.getItem('State'))
        setZip(localStorage.getItem('Zip'))
        setCheckbox(localStorage.getItem('Checkbox Value'));
    }, []);

    const updateAPIData = () => {
        axios.put(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`, {
            breweryId,
            breweryName,
            ownerId,
            breweryImg,
            description,
            isActive,
            address,
            city,
            state,
            zip,
            checkbox
        }).then(() => {
            history.push('/read')
        })
    }
    return (
        <div>
            <Form className="update-form">
            <Form.Field>
                    <label>Brewery Id</label>
                    <input placeholder='Brewery Id' value={breweryId} onChange={(e) => setBreweryId(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Brewery Name</label>
                    <input placeholder='Name of your Brewery' value={breweryName} onChange={(e) => setBreweryName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Owner Id</label>
                    <input placeholder='Your Id' value={ownerId} onChange={(e) => setOwnerId(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Brewery Image</label>
                    <input placeholder='Image URL here or use Image Upload' value={breweryImg} onChange={(e) => setBreweryImg(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input placeholder='Tell us about your brewery' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Active Status</label>
                    <input placeholder='Are you currently active?' value={isActive} onChange={(e) => setIsActive(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Address</label>
                    <input placeholder='Street number and address' value={address} onChange={(e) => setAddress(e.target.value)}/>
                </Form.Field>
                <Form.Field><Form.Field>
                    <label>City</label>
                    <input placeholder='City' value={city} onChange={(e) => setCity(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>State</label>
                    <input placeholder='State' value={state} onChange={(e) => setState(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Zip</label>
                    <input placeholder='Zipcode' value={zip} onChange={(e) => setZip(e.target.value)}/>
                </Form.Field>
                    <Checkbox label='Are you sure you want these changes?' checked={checkbox} onChange={() => setCheckbox(!checkbox)}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}