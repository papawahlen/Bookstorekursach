import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CheckoutSteps(props) {
    return (
        <Row className="checkout-steps">
            <Col className={props.step1 ? 'active' : ''}>Увійти</Col>
            <Col className={props.step2 ? 'active' : ''}>Доставка</Col>
            <Col className={props.step3 ? 'active' : ''}>Оплата</Col>
            <Col className={props.step4 ? 'active' : ''}>Розмістити замовлення</Col>
        </Row>
    );
}