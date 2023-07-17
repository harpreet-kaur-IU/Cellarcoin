import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "../css/Vendor Panel/SellNFT.module.css";
import Router, { useRouter } from "next/router";
import { getOnBoardFromCookie } from "../../auth/userCookies";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropDown from "./DropDown";
import Nft_marketplace_ABI from "./Nft_marketplace_ABI.json";
const SellNFT = () => {
  const router = useRouter();
  const nftId = router.query["id"];
  var JWTtoken = getOnBoardFromCookie();
  const [data, setData] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("MATIC");
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [expire, setExpire] = useState("");
  const [isPrice, setPriceError] = useState(false);
  const [isExpire, setExpireError] = useState(false);
  const regex = /^\d+(\.\d{1,8})?$/;

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const expireHandler = (value) => {
    setExpire(value);
  };

  const validator = () => {
    if (regex.test(price)) {
      setPriceError(false);
    } else {
      setPriceError(true);
    }
    if (expire === "") {
      setExpireError(true);
    } else {
      setExpireError(false);
    }
    if (!regex.test(price) || expire === "") {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (nftId) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + JWTtoken);
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      setLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNftById/${nftId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.data);
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    }
  }, [nftId]);

  //form submit
  const formSubmit = (e) => {
    e.preventDefault();
    var result = validator();
    if (result) {
      sellNftWeb3();
    }
  };

  const sellNftWeb3 = async () => {
    console.log(expire);
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    let errorMessage;

    if (typeof window.ethereum !== "undefined") {
      if (window.ethereum.networkVersion == "80001") {
        const contractAddress = "0x3a428CF5a53da4D6B475c785A83b7279c9c591Bf";
        const contract = new ethers.Contract(
          contractAddress,
          Nft_marketplace_ABI,
          signer
        );
        setLoading(true);
        try {
          // console.log('price', ethers.utils.parseEther(price.toString()));
          contract
            .placeNFTForSale(
              data[0].tokenId,
              ethers.utils.parseEther(price.toString()),
              expire,
              {
                value: ethers.utils.parseEther("0.001"),
              }
            )
            .then((result) => {
              result.wait().then((response) => {
                sellNft(response, addr);
              });
            })
            .catch((error) => {
              console.log("error", error);
              setLoading(false);
              errorMessage = error.toString();
              // console.log(errorMessage);
              if (
                errorMessage &&
                errorMessage.includes("user rejected transaction")
              ) {
                // console.log("error message", errorMessage);
                toast.error("User rejected transaction", {
                  toastId: "sell-error-10",
                });
              } else {
                if(error.reason) {
                  setLoading(false);
                  toast.error(error.reason, {
                    toastId: "sell-error-6",
                  });
                }else{
                  setLoading(false);
                  toast.error("Not enough user funds in the wallet.", {
                    toastId: "sell-error-7",
                  });
                }
              }
            });
        } catch (error) {
          setLoading(false);
          toast.error(error.message, {
            toastId: "create-error-6",
          });
        }
      } else {
        alert("Please switch to polygon chain");
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  //sellnft backend API
  const sellNft = (response, walletAddress) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + JWTtoken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      price: price,
      currency: currency,
      expireAfter: expire,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}vendor/setPrice/${nftId}`,
      requestOptions
    )
    .then((response) => response.json())
    .then((result) => {
      addTransaction(response.hash, nftId, walletAddress);
    })
    .catch((error) => {
      setLoading(false);
      console.log("error", error);
    });
  };

  //create order API
  const addTransaction = (hash, id, walletAddress) => {
    function parseJwt() {
      if(!JWTtoken){
        return
      }
      const base64Url = JWTtoken.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
    var user = parseJwt();
    var userId = (user.user._id)

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + JWTtoken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      walletAddressFrom: userId,
      walletAddressTo: "",
      hash: hash,
      tokenId: data[0].tokenId,
      transactionType: "listed",
      price: price,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}user/createOrder/${id}`,
      requestOptions
    )
    .then((response) => response.text())
    .then((result) => {
      setLoading(false);
      Router.push("/allnftlist");
    })
    .catch((error) => {
      setLoading(false);
      console.log("error", error);
    });
  };
  return (
    <>
      <Header></Header>
      <ToastContainer></ToastContainer>
      {loading && <Loader></Loader>}
      <div className={`${styles["sell-nft-wrapper"]}`}>
        <h2 className={`f-500 l-65 ${styles["sell-nft-main-heading"]}`}>
          Select your sell method
        </h2>
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className={`d-flex ${styles["sell-nft-img-content-wrapper"]}`}
            >
              <img
                className={`col-6 ${styles["sell-nft-img"]}`}
                src={item.imageUrl}
              ></img>
              <div className={`col-6 ${styles["sell-nft-content"]}`}>
                <h4 className="f-500">{item.name}</h4>
                <h5 className={`f-400 l-27 ${styles["nft-desc"]}`}>
                  {item.description}
                </h5>
                <h5
                  className={`f-600 l-27 ${styles["contract-address-heading"]}`}
                >
                  Contract Address
                </h5>
                <h5 className={`f-400 l-27 ${styles["contract-address"]}`}>
                  0x3a428CF5a53da4D6B475c785A83b7279c9c591Bf
                </h5>
                <h5 className={`f-600 l-27 ${styles["token-heading"]}`}>
                  Token Id
                </h5>
                <h5 className={`f-400 l-27 ${styles["token"]}`}>
                  {item.tokenId}
                </h5>
              </div>
            </div>
          ))}
        <div className={`${styles["set-price-wrapper"]}`}>
          <h3 className={`f-600 font-31 ${styles["set-price-nft-h3"]}`}>
            Set Price for your NFT
          </h3>
          <form className="col-8" onSubmit={formSubmit}>
            <div className={` d-flex d-flex-column ${styles["price-wrapper"]}`}>
              <label className="font-24 f-400 l-32">Minimum Price</label>
              <div
                className={`d-flex d-align-center d-justify-space-between ${styles["price-input"]}`}
              >
                <input
                  value={price}
                  onChange={priceHandler}
                  className="col-10"
                  type="text"
                  required
                ></input>
                <div
                  className={`d-flex d-align-center d-justify-center col-2 ${styles["price-unit"]}`}
                >
                  <h6 className="font-24 f-500 l-33">MATIC</h6>
                </div>
              </div>
              {isPrice && (
                <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>
                  Please Enter Valid Price.
                </span>
              )}
            </div>
            <div className={`${styles["expire-date"]}`}>
              <h4 className={`f-600 mb-16 ${styles["expiry-date-h4"]}`}>
                Expiration Date
              </h4>
              {/* <div className={`d-flex d-align-center d-justify-center ${styles["date-wrapper"]}`}> */
              /* <div onClick={dropdownHandler} className={`d-flex d-align-center d-justify-space-between f-500 l-28 ${styles["expiry-dropdown"]}`}>
                  <h5>7 days </h5>
                  <img src='images/arrow-down.png'></img>
                </div>
                {dropdown && 
                  <div></div>
                } */
              /* </div> */}
              <DropDown
                handler={expireHandler}
                placeholder="Select Expiry Date"
              ></DropDown>
              {isExpire && (
                <span className={`mt-32 mb-8 font-14 f-700 text-danger`}>
                  Please Select Expiry Date.
                </span>
              )}
              <div className={`${styles["expire-instructions"]}`}>
                <h4
                  className={`font-24 f-400 l-33 ${styles["expire-instructions-1"]}`}
                >
                  *Not less than 7 days
                </h4>
                <h4
                  className={`font-24 f-400 l-33 ${styles["expire-instructions-2"]}`}
                >
                  *Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h4>
              </div>

              <div className={`d-flex d-flex-column ${styles["royalty-fee"]}`}>
                <h3
                  className={`font-31 f-600 l-39 ${styles["royalty-fee-h3"]}`}
                >
                  Royalty Fee
                </h3>
                <h4
                  className={`font-24 f-400 l-33 ${styles["royalty-fee-h4"]}`}
                >
                  A royalty payment gives a percentage of of the sale price to
                  the orginal creator/ beneficiary each time the NFT is sold on
                  our platform/Marketplace
                </h4>
              </div>

              <div className={`d-flex d-justify-end ${styles["list-btn"]}`}>
                <button className="font-20 f-500">List</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellNFT;
