import {useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useReducer} from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ListGroup, ListGroupItem, Badge, Card, Button} from "react-bootstrap";
import Rating from '../Components/Rating'
import {Helmet} from "react-helmet-async";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import {getError} from "../utils";
import {Store} from "../Store";

const reducer = (state, action) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return{...state, loading:true};
        case 'FETCH_SUCCESS':
            return {...state, product: action.payload, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

function ProductScreen(){
    const navigate = useNavigate();
const params = useParams();
const {slug} = params;

    const [{loading, error, product}, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    });

    useEffect(()=>{
        const fetchData = async() =>{
            dispatch({type: 'FETCH_REQUEST'});
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({type: 'FETCH_SUCCESS', payload: result.data});
            } catch(err){
                dispatch({type: 'FETCH_FAIL', payload: getError(err)});
            }
        };
        fetchData();
    }, [slug])

    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {cart} = state;
    const addToCartHandler = async() => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity++: 1;
        const {data} = await axios.get(`/api/products/${product._id}`);

        if (data.countInStock < quantity ){
            window.alert ('Вибачте, цієї книги немає в наявності');
            return;
        }
        ctxDispatch({
            type:'CART_ADD_ITEM',
            payload: {...product, quantity },
        });
        navigate('/cart');
    }
return loading? (
    <LoadingBox/>
): error?(
        <MessageBox variant = "danger">{error}</MessageBox>
    )
            :(
            <div>
                <Row>
                    <Col md={6}>
                        <img className="img-large"
                        src={product.image}
                             alt={product.name}></img>
                    </Col>
                    <Col md={3}>
                        <ListGroup varian = "flush">
                            <ListGroupItem>
                                <Helmet>
                                <title>{product.name}</title>
                                </Helmet>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating
                                    rating={product.rating}
                                    numReviews={product.numReviews}>
                                </Rating>
                                <ListGroupItem>
                                    Ціна: {product.price}₴
                                </ListGroupItem>
                                <ListGroupItem>
                                    Автор:
                                    {product.author}
                                </ListGroupItem>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Ціна:</Col>
                                            <Col>{product.price}₴</Col>
                                    </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Наявність</Col>
                                            <Col>{product.countInStock>0?(
                                                <Badge bg="success">В наявності</Badge>
                                                ) : (
                                                <Badge bg="danger">Немає в наявності</Badge>
                                            )}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <div className="d-grid">
                                                <Button onClick={addToCartHandler} variant="primary">
                                                    Додати до кошика
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
                );
}
export default ProductScreen;
