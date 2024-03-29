import React, { useState, useRef, useEffect } from "react";
import { isStringLiteral } from "typescript";

const EditMarketPlaceItems = (props) => {
  console.log(props.item.files, "at top check this out please");
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

    console.log("submitted check this out please");
    const newProductName = prodNameRef.current.value;
    var price;
    if (!isFree) {
      price = parseFloat(priceRef.current.value);
    } else {
      price = 0;
    }

    const newCategory = categoryRef.current.value;
    const newDetail = detailRef.current.value;
    //const date = new Date(); Could be used for edit dating
    var newItem = {
      productName:
        newProductName.trim().length == 0
          ? props.item.productName
          : newProductName,
      category: newCategory,
      price: isNaN(price) ? props.item.price : price,
      details: newDetail.trim().length == 0 ? props.item.details : newDetail,
      thumbnail: props.item.thumbnail, //this should just be first image found in files

      files: itemFiles,
      productId: props.item.productId,
    };

    //do the props.function before resetting refValues
    props.editItem(props.item.productId, newItem);

    prodNameRef.current.value = "";
    categoryRef.current.value = props.item.category;
    detailRef.current.value = "";
    priceRef.current.value = null;
    props.handleModalToggle();
  };

  const reRenderFunction = () => {
    // e.target.style.display = "none";
    setToRender({});
  };

  //just holds a copy of props.item.files that we can edit

  const [itemFiles, setItemFiles] = useState(props.item.files);

  //if(props.item.files !==)

  useEffect(() => {
    console.log(props.item.files, "check this out please");

    setItemFiles(props.item.files);
  }, [props.item]);
  //checks if props.item has changed. This runs on every render lawl
  //this should run ON EVERY RENDER, so a user's progress is not saved. Simply pass in a previousLookedAtPost parameter and if it is not homePage, then just call this again

  const [filesToShow, setFilesToShow] = useState();

  const [toRender, setToRender] = useState({});

  useEffect(() => {
    console.log("RAN");
    let tempFiles = itemFiles;

    setFilesToShow(
      itemFiles.map((file) => {
        return (
          <img
            style={{ width: "200px", height: "500px" }}
            src={typeof file === "string" ? file : URL.createObjectURL(file)}
            //src should assume file is an object
            onClick={(e) => {
              const start = tempFiles.indexOf(file);
              const deleteCount = 1;
              tempFiles.splice(start, deleteCount);

              //edits the copy
              setItemFiles(tempFiles); //we want this useEffect to run again once onClick occurs

              //sets the edited copy to local version we will set as
              reRenderFunction();

              //hides it from view
              //could also just call another render of this file to get the same effect
              //This is so that the user does not accidently remove the video when clicking it to watch it
              //This should be redesigned into a X button on a top corner of the video.
            }}
          />
        );
      })
    );
  }, [itemFiles, toRender, setItemFiles]);

  return (
    <div>
      <form
        id="register-form"
        className="formMaster"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label htmlFor="product name">Product Name: </label>
        <input
          type="text"
          name="productName"
          ref={prodNameRef}
          //onBlur={entryBoxValidator}
          placeholder={props.item.productName}
        />

        <label>Category:</label>
        <select
          className="dropDown"
          name="category"
          ref={categoryRef}
          onChange={isFreeCheck}
          defaultValue={props.item.category} //When a new item is clicked, this defaultValue does not update on re-render. Must fix
          key={props.item.category} //required for defaultValue to change on re-render
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

        {!isFree && <label htmlFor="price">Price:</label>}
        {!isFree && (
          <input
            type="number"
            step=".01"
            name="price"
            ref={priceRef}
            placeholder={props.item.price}
            min="0"
          />
        )}

        <label htmlFor="detail">Details: </label>
        <textarea
          id="message"
          className="message"
          name="detail"
          cols="20"
          rows="6"
          ref={detailRef}
          placeholder={props.item.details}
        ></textarea>
        <br />
        <p>In a blockchain, edit history is immutable.</p>
        <button>Update Item</button>

        <input
          type="file"
          multiple="multiple"
          accept="image/jpeg, image/png, image/jpg"
          name="myImage"
          onMouseOver={(event) => {
            //setFileUploadInfo(true);
          }}
          onMouseOut={(event) => {
            //setFileUploadInfo(false);
          }}
          onChange={(event) => {
            if (itemFiles.length + event.target.files.length > 5) {
              alert("You can only have 5 files!");
            } else {
              console.log(event.target.files, "zororor");

              for (let i in [...Array(event.target.files.length).keys()]) {
                console.log(event.target.files[i], "wororor");
                setItemFiles((prevFiles) => {
                  return [...prevFiles, event.target.files[i]]; //When I do this, and click remove on one of them, it removes all uploaded files plus item [-1]. This is because we index off of tempFiles
                });
              }
            }
          }}
        />
        {/* {fileUploadInfo && (
          <p>
            Upload up to 5 images. Acceptable files are jpeg, png, and jpg.
            Files do not append. Upload all at once.
          </p>
        )} */}

        <output id="result" />
      </form>
      {filesToShow}
    </div>
  );
};

export default EditMarketPlaceItems;
