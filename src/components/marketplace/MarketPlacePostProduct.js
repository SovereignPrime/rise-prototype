import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import classes from "./MarketPlacePostProduct.module.css";
import { DarkButton } from "../Buttons";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import { addItem } from "../../store/features/marketItem/marketItemSlice";

const MarketPlacePostProduct = (props) => {
	const dispatch = useDispatch();

	const [thumbnail, setThumbnail] = useState(null);
	const [isFree, setIsFree] = useState(false);
	const [fileUploadInfo, setFileUploadInfo] = useState(false);

	const prodNameRef = useRef();
	const priceRef = useRef();
	const categoryRef = useRef();
	const detailRef = useRef();

	const isFreeCheck = () => {
		const category = categoryRef.current.value;
		if (category == "Free Stuff") {
			setIsFree(true);
		} else {
			setIsFree(false);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const prodName = prodNameRef.current.value;
		var price;
		if (!isFree) {
			price = parseFloat(priceRef.current.value);
		} else {
			price = 0;
		}

		const category = categoryRef.current.value;
		const detail = detailRef.current.value;
		const date = new Date();
		dispatch(
			addItem({
				Id: 2,
				//perPic and perName should be linked with backend to autofill
				perPic: "TBA",
				perName: "TBA",
				prodName: prodName,
				Category: category,
				Price: price,
				Detail: detail,
				prodPic: thumbnail,
				Good: 0,
				Bad: 0,
				Date: date,
			})
		);
		console.log(typeof thumbnail);
	};

	return (
		<div className={classes.backdrop} onClick={props.closeAddProduct}>
			<div className={classes.modal} onClick={(e) => e.stopPropagation()}>
				<form
					id="register-form"
					className="formMaster"
					onSubmit={(event) => handleSubmit(event)}
				>
					<label htmlFor="product name" className={classes.label}>Product Name: </label>
					<input
						type="text"
						name="productName"
						className={classes.input}
						ref={prodNameRef}
						//onBlur={entryBoxValidator}
						required
					/>

					<label className={classes.label}>Category:</label>
					<select

						name="category"
						className={classes.input}
						ref={categoryRef}
						onChange={isFreeCheck}
					>
						<option value="placeholder" disabled>
							{" "}
							Please select the category of your product:
						</option>
						<option value="Vehicles">Vehicles</option>
						<option value="Property Rental">Property Rental</option>
						<option value="Apparel">Apparel</option>
						<option value="Classifieds">Classifieds</option>
						<option value="Electronics">Electronics</option>
						<option value="Entertainment">Entertainment</option>
						<option value="Family">Family</option>
						<option value="Free Stuff">Free Stuff</option>
						<option value="Garden & Outdoors">Garden & Outdoors</option>
						<option value="Others">Others</option>
					</select>
					{/* <p>
						{" "}
						Note from dev: The CSS is bad for this modal, so you may not be able
						to see the upload files button without a large screen
					</p> */}

					{!isFree && <label htmlFor="price" className={classes.label}>Price:</label>}
					{!isFree && (
						<input
							className={classes.input}
							type="number"
							step=".01"
							name="price"
							ref={priceRef}
							required
						/>
					)}

					<label htmlFor="detail" className={classes.label}>Details: </label>
					<textarea
						className={classes.detail}
						id="message"
						placeholder="Your Message"
						name="detail"
						cols="20"
						rows="6"
						ref={detailRef}
						required
					></textarea>
					<br />


					<input
						className={classes.label}
						type="file"
						multiple="multiple"
						accept="image/jpeg, image/png, image/jpg"
						name="myImage"
						onMouseOver={(event) => {
							setFileUploadInfo(true);
						}}
						onMouseOut={(event) => {
							setFileUploadInfo(false);
						}}
						onChange={(event) => {
							console.log(event.target.files);
							if (event.target.files.length > 5) {
								event.preventDefault();
								alert("You can only choose up to 5 images");
								return;
							} else {
								setThumbnail(event.target.files);
							}
						}}
					/>
					{fileUploadInfo && (
						<p>
							Upload up to 5 images. Acceptable files are jpeg, png, and jpg.
							Files do not append. Upload all at once.
						</p>
					)}

					<DarkButton className={classes.button}>Post Product</DarkButton>
					<output id="result" />
				</form>
			</div>
		</div>
	);
};

export default MarketPlacePostProduct;
