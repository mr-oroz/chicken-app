import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ProductContext from '../../useContext/ProductContext';
import axios from 'axios';
import InputMask from 'react-input-mask'

const ModalBasket = (props) => {
    const Product = useContext(ProductContext);
    const { handleClose, show } = props;
    const [value, setValue] = useState([]);
    const [confirm, setConfirm] = useState(true);
    const [text, setText] = useState('');
    const [number, setNumber] = useState('');
    const [checked, setChecked] = useState([])
    const basket = Product.product;

    const handleChecked = (e, g) => {
        if (e) {
            setChecked(k => [...k, g])
        } else {
            setChecked(k => k.filter(v => v.idMeal !== g.idMeal))
        }
    }
    const handleChangeText = (e) => {
        setText(e)
    }
    const handleChangeNumber = (e) => {
        setNumber(e)
    }
    const handleChange = (e) => {
        setValue(e)
    }

    const handleConfirm = () => {
        axios.post(`https://api.telegram.org/bot1814975791:AAFnCeAczMHxFcsgmrFtbraNy5nvXMq8U7w/sendMessage`, {
            parse_mode: 'HTML',
            text: `<b>NEW ORDER</b>\n\nFull name: ${text} \nPhone number: ${number} \n${checked.map((v) => `\n${v.strMeal}`)}`,
            chat_id: -1001478902079,
        })
        setConfirm(false)
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header variant='d-flex flex' closeButton>
                <Modal.Title>Confrim your order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Your full name</Form.Label>
                        <Form.Control onChange={(e) => handleChangeText(e.target.value)} value={text} type="text" placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contact phone number</Form.Label>
                        <InputMask onChange={(e) => { handleChangeNumber(e.target.value) }} value={number} mask='+\9\96 999 999 999'>
                            {(props) => <Form.Control {...props} type='tel' />}
                        </InputMask>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        {
                            basket.map((value, id) => {
                                return (
                                    <>
                                        <Form.Check

                                            onChange={(e) => { handleChecked(e.target.checked, value) }}
                                            value={checked.find(f => f.idMeal === value.idMeal) ?
                                                true : false
                                            }
                                            id={id} type="checkbox"
                                        />
                                        <Form.Label
                                            for={id}
                                        >
                                            {value.strMeal}
                                        </Form.Label>
                                    </>
                                )
                            })
                        }
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Body>
                <Form.Group>
                    <Form.Check type="checkbox" label="Remove meals from trash after order" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleConfirm()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBasket;