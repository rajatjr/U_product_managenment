import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import path from '../path';
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import '../App.css';
import photo from '../s.png';


function Search() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user } = jwt_decode(token);
  const username = user.name;
  const user_id = user.id
  console.log(user)

  let [item, setItem] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState();
  const [formshow, setFormshow] = useState(false);
  const [updateid, setUpdateid] = useState();
  const [formshow1, setFormshow1] = useState(false);
  const [state, setState] = useState({
    Product_name: "",
    Product_Price: "",
    Product_category: ""
  });

  const handleClose = () => setShow(false);
  const handleForm = () => setFormshow(false);
  const handleForm1 = () => setFormshow1(false);

  const changeHandeler = (e) => {
    console.log(e.target.value)
    setItem(e.target.value);
  }


  //handle form change
  const handleFormChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };


  //Form show
  const handleFormshow1 = (id) => {
    console.log(id)
    setFormshow1(true);
    getallproductsdetails()
    setUpdateid(id)
  };

  const handleFormshow = () => {
    setFormshow(true);
  };


  //get products by items
  function getProductDetail(item) {
    axios.get(`${path}/finditems/?item=${item}`)
      .then((response) => {
        setData(response.data);
      })
  }

  //Add new products 
  const handleSubmit = (e) => {
    e.preventDefault();
    const { Product_name, Product_Price, Product_category } = state;
    axios.post(`${path}/addproducts`, {
      Product_name,
      Product_Price,
      Product_category,
      user_id
    })
      .then((response) => {
        console.log(response)

        // alert('product added successfully')
        toast.success('Product added', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        getallproductsdetails()
      })
      .catch(error => {
        console.error('Error calling API', error);
      });
  };

  // get all product details
  function getallproductsdetails() {
    axios.get(`${path}/getAllProducts/${user_id}`)
      .then((response) => {
        console.log(response)
        setData(response.data);
      })
  }
  useEffect(() => {
    getallproductsdetails()

  }, [])

  //handle product details show
  const handleShow = (id) => {
    setShow(true);
    axios.get(`${path}/productdetails/?id=${id}`)
      .then((response) => {
        setModalData(response.data[0]);
      });
  }

  //delete items
  const deleteitem = (id) => {
    axios.get(`${path}/deleteitem/?id=${id}`)
      .then((response) => {

        // alert('product deleted successfully')
        toast.success('Product deleted', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        getallproductsdetails()
      });
  }

  //update
  const handleupdate = (e) => {

    e.preventDefault();
    const { Product_name, Product_Price, Product_category } = state;
    axios.put(`${path}/update/?id=${updateid}`,
      {
        Product_name,
        Product_Price,
        Product_category
      })
      .then((response) => {
        console.log(response)

        // alert('product updated successfully')
        toast.success('Product Updated', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        getallproductsdetails()
      })
      .catch(error => {
        console.error('Error calling API', error);
      });
  };
  const handleLogout = () => {


    // Remove the token from local storage
    localStorage.removeItem('token');
    navigate('/')
    toast.success('Logout Successfully', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });;
  };


  return (
    <>
      {<Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">PRODUCTS</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
              <Nav.Link href="">HOME</Nav.Link>
              <Nav.Link href="" onClick={handleFormshow} className="addProducts">ADD PRODUCTS
              </Nav.Link>
            </Nav>
            <Navbar.Text className='me-2'>
              WELCOME: {username}
            </Navbar.Text>
            <Form className="d-flex">
              <Form.Control
                type="text"
                name='product'
                onChange={(e) => changeHandeler(e)}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button className="me-2" variant="success" onClick={() => getProductDetail(item)}>SEARCH</Button>
              <Button variant="danger" onClick={handleLogout}>LOGOUT</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>}

      <ul>
        {
          data.map((item) => {
            return (
              <div className='cardstyle'>
                <img src={photo} alt="" />
                <h6 className='cardtitlemargin'>Title: {item?.Product_name}</h6>
                <h6>Price: {item?.Product_Price}</h6>
                <h6>Categories: {item?.Product_category}</h6>
                <h6 className='text-capitalize'>Product added by: {username}</h6>
                <Button variant="primary" className='cardbutton' onClick={() => handleShow(item?.id)}>
                  Details
                </Button>
                <Button variant="success" className='cardbutton' onClick={() => handleFormshow1(item?.id)}>
                  Update
                </Button>
                <Button variant="danger" className='cardbutton' onClick={() => deleteitem(item?.id)}>
                  Delete
                </Button>
              </div>
            )

          })
        }
        
      </ul>
      {/* product details  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>NAME: <b>{modalData?.Product_name}</b></Modal.Body>
        <Modal.Body>PRICE: <b>{modalData?.Product_Price}</b></Modal.Body>
        <Modal.Body>CATEGORY: <b>{modalData?.Product_category}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add form for product details */}
      <Modal show={formshow} onHide={handleForm}>
        <Modal.Header closeButton>
          <Modal.Title>ADD PRODUCT</Modal.Title>
        </Modal.Header>
        <Form className='formmodal' onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Product_name">PRODUCT DETAILS</Form.Label>
            <Form.Control type="text" id="Product_name" name="Product_name" placeholder="Product_name " onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Product_Price">PRODUCT PRICE</Form.Label>
            <Form.Control type="text" id="Product_Price" name="Product_Price" onChange={handleFormChange} placeholder="Product Price" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="Product_category">PRODUCT CATEGORY</Form.Label>
            <Form.Select name="Product_category" id="Product_category" onChange={handleFormChange}>
              <option value="Select Category">--Select Categories--</option>
              <option value="SmartPhones">SmartPhones</option>
              <option value="Appliances">Appliances</option>
              <option value="Fashion">Fashion</option>
              <option value="Grocery">Grocery</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" className="buttonposition" type="submit" >
          ADD PRODUCT
          </Button>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleForm}>
            CLOSE
          </Button>
        </Modal.Footer>
      </Modal>

      {/* update details */}

      <Modal show={formshow1} onHide={handleForm1}>
        <Modal.Header closeButton>
          <Modal.Title>Update Products Details</Modal.Title>
        </Modal.Header>
        <Form className='formmodal' onSubmit={handleupdate}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Product_name">PRODUCT NAME</Form.Label>
            <Form.Control type="text" id="Product_name" name="Product_name" placeholder="Product_name " onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Product_Price">PRODUCT PRICE</Form.Label>
            <Form.Control type="text" id="Product_Price" name="Product_Price" onChange={handleFormChange} placeholder="Product Price" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="Product_category">Product Categories</Form.Label>
            <Form.Select name="Product_category" id="Product_category" onChange={handleFormChange}>
              <option value="Select Category">--Select Categories--</option>
              <option value="Mobiles">SmartPhones</option>
              <option value="Appliances">Appliances</option>
              <option value="Fashion">Fashion</option>
              <option value="Grocery">Grocery</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" >
            UPDATE
          </Button>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleForm1}>
            CLOSE
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Search