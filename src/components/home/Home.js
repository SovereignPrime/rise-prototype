import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Table } from "reactstrap";
import { Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import DropdownMessage from "../DropdownMenus/DropdownMessage";
import DropdownCategory from "../DropdownMenus/DropdownCategory";
import PaymentModal from "../Modals/PaymentModal";

import { DarkButton } from "../Buttons";
import {
	Button,
	Modal,
	ModalFooter,
	ModalHeader,
	ModalBody,
	FormGroup,
	Label
} from "reactstrap";
import CardObject from "../Card/CardObject";
import person1 from "../../styles/assets/person1.jpg";
import person2 from "../../styles/assets/person2.jpg";
import person3 from "../../styles/assets/person3.jpg";
import person4 from "../../styles/assets/person4.jpg";
import MarketPlace from "../Me/MeComponents/marketPlace";
import Message from "../Me/MeComponents/message";

const data = [
	{
		userName: "user 1",
		userImg: person1,
		typeOfaction: "Message",
		timeOfAction: "10h"
	},
	{
		userName: "user 2",
		userImg: person2,
		typeOfaction: "Payment",
		timeOfAction: "13h"
	},
	{
		userName: "user 3",
		userImg: person3,
		typeOfaction: "MarketPlace",
		timeOfAction: "14h"
	},
	{
		userName: "user 4",
		userImg: person4,
		typeOfaction: "autheticate",
		timeOfAction: "15h"
	},
	{
		userName: "user 5",
		userImg: person2,
		typeOfaction: "MarketPlace",
		timeOfAction: "17h"
	}
];

const Home = (props) => {
	// properties: searchTerm
	let searchedArray = [];
	const data = useSelector((state) => state.marketItem.marketItems);
	const dataForUser = useSelector((state) => state.user.users);
	const dataForUserAction = useSelector(
		(state) => state.userAction.userActions
	);
	// console.log(dataForUserAction);
	const [action, setAction] = useState("");
	const [filterBtnClicked, setFilterBtnClicked] = useState(false);
	const [plusBtnClicked, setPlusBtnClicked] = useState(false);
	const [searchEl, setSearchEl] = useState("");
	const [radioEL, setRadioEl] = useState("");

	const filterNotification = (data) => {
		if (action === "MarketPlace") {
			return data.typeOfaction === "MarketPlace";
		} else if (action === "Payment") {
			return data.typeOfaction === "Payment";
		} else if (action === "Message") {
			return data.typeOfaction === "Message";
		} else if (action === "") {
			return data;
		}
	};

	const handleChange = (e) => {
		console.log("Radio selection: " + radioEL);
		console.log("Searched: " + searchEl);
		
		// Take the user to the search results page
		if (searchEl !== "" && radioEL !== "") {
			props.setSearchTerm(searchEl);
			window.open("#/Dashboard/SearchResults/", "_self");
		}
		else {
			alert("Please select a category and enter a search term");
		}
	};

	// Modal1 open state
	const [modal1, setModal1] = React.useState(false);

	// Toggle1 for Modal
	const toggle1 = () => setModal1(!modal1);

	// Modal2 open state
	const [modal2, setModal2] = React.useState(false);

	// Toggle2 for Modal
	const toggle2 = () => setModal2(!modal2);

	// Modal3 open state
	const [modal3, setModal3] = React.useState(false);

	// Toggle3 for Modal
	const toggle3 = () => setModal3(!modal3);

	return (
		<div style={{ marginLeft: " 2%" }}>
			<div className="search-container">
				<div className="search-inner">
					<Input
						placeholder="Enter here to Search..."
						className="search-input"
						value={searchEl}
						onChange={(e) => setSearchEl(e.target.value)}>
					</Input>
					<Button
						className="btn-search"
						color="transparent"
						onClick={handleChange}>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</Button>
				</div>
				<div className="dropdown">
					{	
						data.filter(item => {
						const searchElLower = searchEl.toLowerCase();
						const prodNameLower = item.prodName.toLowerCase()

						return searchEl && prodNameLower.startsWith(searchElLower) && searchElLower !== prodNameLower;
					})
					.slice(0, 10)
					.map((item) => {
						return <div className="dropdown-row" onClick={() => setSearchEl(item.prodName)}>{item.prodName}</div>
					})}
				</div>
			</div>

			<div style={{ display: "flex", marginTop: "1rem" }} className="radios">
				<FormGroup className="radioEl">
					<Input
						name="radioEl"
						type="radio"
						id="notification"
						onClick={(e) => setRadioEl("notification")}
						value
					/>{" "}
					<Label check>Notification</Label>
				</FormGroup>
				<FormGroup className="radioEl">
					<Input
						name="radioEl"
						type="radio"
						id="verification"
						onClick={(e) => setRadioEl("verification")}
					/>{" "}
					<Label check>Verification</Label>
				</FormGroup>
				<FormGroup className="radioEl">
					<Input
						name="radioEl"
						type="radio"
						id="marketPlace"
						onClick={(e) => setRadioEl("Marketplace")}
						defaultChecked
					/>{" "}
					<Label check>Marketplace</Label>
				</FormGroup>
			</div>
			<div className="container d-flex mt-4">
				<div className="row">
					<div
						className="col-lg p-4 overflow-scroll box mr-auto"
						style={{ width: "800px", marginBottom: "0" }}>
						<div className="topBar">
							<div>
								<h3 style={{ marginTop: "-15px" }}>Notification</h3>
							</div>
							<div
								className="icons"
								style={{
									marginLeft: "5%"
								}}>
								<ul
									className="menuContainer"
									style={{
										visibility:
											plusBtnClicked || filterBtnClicked ? "visible" : "hidden",
										height:
											plusBtnClicked || filterBtnClicked ? "200px" : "100px",
										padding: "10px",
										marginBottom: "0"
									}}>
									<FontAwesomeIcon
										style={{
											visibility: plusBtnClicked ? "hidden" : "visible"
										}}
										className="iconN"
										icon={faSliders}
										onClick={() =>
											setFilterBtnClicked(
												(prevFilterBtnClicked) => !prevFilterBtnClicked
											)
										}
									/>
									<FontAwesomeIcon
										className="iconN"
										icon={faPlus}
										style={{
											visibility: filterBtnClicked ? "hidden" : "visible"
										}}
										onClick={() =>
											setPlusBtnClicked(
												(prevPlusBtnClicked) => !prevPlusBtnClicked
											)
										}
									/>
									<li
										style={{ textAlign: "left" }}
										value="Message"
										onClick={
											filterBtnClicked ? (e) => setAction("Message") : toggle1
										}>
										{" "}
										Message
									</li>
									<li
										style={{ textAlign: "left" }}
										value="Payment"
										onClick={
											filterBtnClicked ? (e) => setAction("Payment") : toggle2
										}>
										Payment
									</li>
									<li
										style={{ textAlign: "left" }}
										value="MarketPlace"
										onClick={
											filterBtnClicked
												? (e) => setAction("MarketPlace")
												: toggle3
										}>
										MarketPlace
									</li>
								</ul>
							</div>
						</div>

						<Table borderless className="mr-4">
							<tbody>
								{data
									.filter((person) =>
										action === "" ? person : person.typeOfaction === action
									)
									.map((item) => (
										<tr key={item.userName}>
											<td style={{ display: "flex" }}>
												<img
													src={item.userImg}
													width="50px"
													height="50px"
													alt=""
													style={{
														borderRadius: "50%",
														objectFit: "cover",
														marginRight: "10px"
													}}></img>
												<p style={{ marginRight: "10px" }}>{item.userName} </p>
												<p style={{ marginRight: "10px" }}>send you a </p>
												<p>{item.typeOfaction}</p>
												<p
													style={{
														marginRight: "10px",
														color: "gray",
														textAlign: "center"
													}}>
													{item.timeOfAction}
												</p>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</div>
					<div className="col-lg p-2 box overflow-scroll">
						<h3 style={{ textAlign: "left", marginTop: "5px" }}>
							Verification
						</h3>
						<Table borderless>
							<tbody>
								<tr>
									<td style={{ textAlign: "left", paddingLeft: "35px" }}>
										<Link to="../Matching/" style={{ color: "black" }}>
											<span className="dot"></span>2 Verification left
										</Link>
										<p></p>
										{dataForUserAction?.map((actionType) => (
											<div key={actionType.Id} className="">
												<p className="col">
													{actionType.perName} requests you verification
												</p>
											</div>
										))}
									</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</div>
			</div>

			<PaymentModal />
			<Modal isOpen={modal1} toggle={toggle1}>
				<ModalHeader toggle={toggle1}>Add Message</ModalHeader>
				<ModalBody>
					<Input
						id="unmountOnClose1"
						name="unmountOnClose1"
						onChange={function noRefCheck() {}}
						type="textarea"
						className="textareaModal"></Input>
				</ModalBody>

				<ModalFooter>
					<DropdownMessage />

					<DarkButton onClick={toggle1}>Send</DarkButton>
				</ModalFooter>
			</Modal>
			<Modal isOpen={modal2} toggle={toggle2}>
				<ModalHeader toggle={toggle2}>Add Payment</ModalHeader>
				<ModalBody>
					<p>Payment Amount</p>
					<div style={{ display: "flex" }} className="mb-3">
						<p className="mt-3">$</p>
						<Input
							id="unmountOnClose"
							name="unmountOnClose"
							onChange={function noRefCheck() {}}
							type="input"
							placeholder="0.00"></Input>
					</div>

					<Input
						id="unmountOnClose"
						name="unmountOnClose"
						onChange={function noRefCheck() {}}
						type="textarea"
						placeholder="Say something..."
						className="textareaModal"></Input>
				</ModalBody>

				<ModalFooter>
					<DropdownMessage />

					<DarkButton onClick={toggle1}>Send</DarkButton>
				</ModalFooter>
			</Modal>
			<Modal isOpen={modal3} toggle={toggle3}>
				<ModalHeader toggle={toggle3}>Add New MarketPlace</ModalHeader>
				<ModalBody>
					<div style={{ display: "flex" }}>
						{" "}
						<p>Price</p> <DropdownCategory />
					</div>

					<div style={{ display: "flex" }} className="mb-3">
						{" "}
						<p className="mt-3">$</p>
						<Input
							id="unmountOnClose"
							name="unmountOnClose"
							onChange={function noRefCheck() {}}
							type="input"
							placeholder="0.00"></Input>
					</div>
					<Input
						id="unmountOnClose"
						name="unmountOnClose"
						onChange={function noRefCheck() {}}
						type="textarea"
						placeholder="Say something..."
						className="textareaModal"></Input>
				</ModalBody>

				<ModalFooter>
					<DropdownMessage />

					<DarkButton onClick={toggle1}>Send</DarkButton>
				</ModalFooter>
			</Modal>
			<div className="marketItem mt-4">
				<p className="text-secondary" style={{ textAlign: "right" }}>
					View All MarketPlace update &gt;
				</p>
				<CardObject param={data} />
			</div>
		</div>
	);
};

export default Home;
