import React from 'react'
import classes from "./CheckSellerInfo.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Card, CardBody, CardText, CardImg, CardTitle, Row, Col, Button } from "reactstrap";
import img1 from "../../styles/assets/img/jessie.png";
import prod1 from "../../styles/assets/appwatch.jpg";
import prod2 from "../../styles/assets/minicooper.jpeg";
import prod3 from "../../styles/assets/ps5.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThumbsUp,
    faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, Link } from "react-router-dom";


const data = [
    {
        Id: 1,
        perName: "Eric Smith",
        perPic: img1,
        prodName: "Apple Watch",
        Category: "electronics",
        Price: 450,
        Detail: "this is a apple watch",
        prodPic: prod1,
        Good: 14,
        Bad: 2,
        Date: "2022-05-25",
    },
    {
        Id: 2,
        perName: "Eric Smith",
        perPic: img1,
        prodName: "MINI cooper",
        Category: "vehicles",
        Price: 1000,
        Detail: "this is a car",
        prodPic: prod2,
        Good: 14,
        Bad: 2,
        Date: "2022-05-22",
    },
    {
        Id: 3,
        perName: "Eric Smith",
        perPic: img1,
        prodName: "PS5",
        Category: "entertainment",
        Price: 200,
        Detail: "this is a PS station",
        prodPic: prod3,
        Good: 14,
        Bad: 2,
        Date: "2021-05-27",
    },
];


const Sellerdata = [
    {
        Id: 1,
        perName: "Eric Smith",
        perPic: img1,
        Intro: "I like everything about vehicle"
    },
    {
        Id: 2,
        perName: "Sam Smith",
        perPic: img1,
        Intro: "I like everything about vehicle"
    },
];


const CheckSellerInfo = props => {

    console.log(data.filter(person => person.perName == props.checkSellerName)[1].perPic);
    return (
        <div className={classes.backdrop} onClick={props.closeCheckSellerHandler}>
            <div className={classes.modal} onClick={(e) => e.stopPropagation()}>

                <img className={classes.seller} src={props.checkSellerPic} width="20%"></img>
                {/* {props.checkSellerName} */}
                <div className={classes.buttonGroup}>
                    <Button>Follow</Button>
                    {' '}
                    <Button>View Profile</Button>
                    {' '}
                    <Button>Report</Button>
                </div>
                <div className="border-top"></div>
                <div className={classes.sellerTitle}>
                    About
                </div>
                {Sellerdata.filter(person => person.perName == props.checkSellerName).map((item) => (
                    <div className={classes.sellerAbout}>
                        {item.Intro}
                    </div>
                ))}
                <div className="border-top" style={{ marginLeft: "5px" }}></div>
                <div className={classes.sellerTitle}>
                    Listing
                </div>
                <div className={classes.prod_container}>
                    <div class="row g-3">
                        {data.filter(person => person.perName == props.checkSellerName).map((item) => (
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <Card key={item.Id}>
                                    <CardImg
                                        className="cardimg"
                                        alt="Card image cap"
                                        src={item.prodPic}
                                        width="30%"
                                        height={250}
                                        top
                                    />
                                    <CardBody>
                                        <CardText>
                                            <div className="market-person">
                                                <img src={item.perPic} width="20%"></img>
                                                <small className="text-muted">
                                                    &nbsp; {item.perName}
                                                </small>
                                                <FontAwesomeIcon
                                                    className="iconN"
                                                    icon={faThumbsUp}
                                                    size="1x"
                                                    transform="down-9 right-7"
                                                />
                                                <span>{item.Good}</span>
                                                <FontAwesomeIcon
                                                    className="iconN"
                                                    icon={faThumbsDown}
                                                    size="1x"
                                                    transform="down-10 right-7"
                                                />
                                                <span>{item.Bad}</span>
                                            </div>
                                            <div className="market-product-name">
                                                {item.prodName}
                                            </div>
                                            <div>
                                                <Row md="2">
                                                    <Col className="market-product-price">
                                                        ${item.Price}
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                            key={item.Id}
                                                            to={`detail/${item.Id}`}
                                                        >
                                                            <Button size="sm">Detail</Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}

                    </div>
                </div>
                <div>
                </div>
            </div>
        </div >
    );
};

export default CheckSellerInfo;