import React, { useEffect, useState } from 'react';
import Header from './Header';
import styles from '.././css/Vendor Panel/Listing.module.css';
import { useRouter } from 'next/router';
import { getOnBoardFromCookie } from '../../auth/userCookies';
import Link from 'next/link';
import SellNow from './SellNow';
import Modal from '../Vendors Panel/Modal';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';
import CancelListingModal from './CancelListingModal';
import Nft_marketplace_ABI from './Nft_marketplace_ABI.json';

const Listing = () => {
  const router = useRouter();
  const nftId = router.query['id'];
  const [data, setData] = useState('');
  const [hasMount, setHasMount] = useState(false);
  const [add, setAdd] = useState('');
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState('');
  const [cancelModal, setCancelModal] = useState(false);
  var JWTtoken = getOnBoardFromCookie();

  if (hasMount) {
    return data;
  }
  const modalHandler = () => {
    setAdd((prev) => !prev);
  };
  useEffect(() => {
    if (nftId) {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + JWTtoken);
      myHeaders.append('Content-Type', 'application/json');

      var requestOptions = {
        method: 'GET',
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
        .catch((error) => console.log('error', error));

      //activity log
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      setLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}user/getTransaction?nftId=${nftId}&&status=null`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setActivity(result.data);
          setLoading(false);
        })
        .catch((error) => console.log('error', error));
    }
  }, [nftId]);

  const cancelListing = () => {
    setCancelModal((prev) => !prev);
  };

  const handlerCancelListing = async () => {
    console.log('handlerCancelListing');

    await removeNFT();

    console.log('done');
    cancelListing();
  };

  const removeNFT = async () => {
    console.log('tokenId', data[0].tokenId);
    const ethers = require('ethers');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    let errorMessage;

    if (typeof window.ethereum !== 'undefined') {
      if (window.ethereum.networkVersion == '80001') {
        const contractAddress = '0x3a428CF5a53da4D6B475c785A83b7279c9c591Bf';
        const contract = new ethers.Contract(
          contractAddress,
          Nft_marketplace_ABI,
          signer
        );
        setLoading(true);
        try {
          contract
            .RemoveNFTfromSale(data[0].tokenId)
            .then((result) => {
              result.wait().then((response) => {
                deleteNFT(response, addr);
              });
            })
            .catch((error) => {
              setLoading(false);
              errorMessage = error.toString();
              if (
                errorMessage &&
                errorMessage.includes('user rejected transaction')
              ) {
                console.log('error message', errorMessage);
                toast.error('User rejected transaction', {
                  toastId: 'create-error-10',
                });
              } else {
                if (error.reason) {
                  setLoading(false);
                  toast.error(error.reason, {
                    toastId: 'sell-error-6',
                  });
                } else {
                  setLoading(false);
                  toast.error('Not enough user funds in the wallet.', {
                    toastId: 'sell-error-7',
                  });
                }
              }
            });
        } catch (error) {
          setLoading(false);
          toast.error(error.message, {
            toastId: 'create-error-6',
          });
        }
      } else {
        alert('Please switch to polygon chain');
      }
    } else {
      console.log('Please install MetaMask');
    }
  };

  // const deleteNFT = (response, walletAddress) => {
  //   var myHeaders = new Headers();
  //   myHeaders.append('Authorization', 'Bearer ' + JWTtoken);
  //   myHeaders.append('Content-Type', 'application/json');

  //   var requestOptions = {
  //     method: 'PATCH',
  //     headers: myHeaders,
  //   };
  //   setLoading(true);
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}vendor/deleteNft/${deleteUserId}`,
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNft?status=null`, {
  //         method: 'GET',
  //         headers: myHeaders,
  //       })
  //         .then((response) => response.json())
  //         .then((results) => {
  //           setData(results.data);
  // addTransaction(response.hash, deleteUserId, walletAddress);
  //         });
  //       setDelete((prev) => !prev);
  //       setLoading(false).catch((error) => console.log('error', error));
  //     })
  //     .catch((error) => console.log('error', error));
  // };

  // const addTransaction = (hash, id, walletAddress) => {
  //   var myHeaders = new Headers();
  //   myHeaders.append('Authorization', 'Bearer ' + JWTtoken);
  //   myHeaders.append('Content-Type', 'application/json');

  //   var raw = JSON.stringify({
  //     walletAddressFrom: walletAddress,
  //     walletAddressTo: '',
  //     hash: hash,
  //     tokenId: data[0].tokenId,
  //     transactionType: 'Cancel Listing', // todo -> need to set correct state in back-end
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow',
  //   };

  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}user/createOrder/${id}`,
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => {
  //       toast.success('NFT Deleted Successfully', {
  //         toastId: '2',
  //       });
  //     })
  //     .catch((error) => console.log('error', error));
  // };

  return (
    <div>
      <Header></Header>
      <ToastContainer></ToastContainer>

      {loading && <Loader></Loader>}
      <div
        className="vendor-container"
        style={{ paddingTop: '24px', height: '100vh', overflow: 'scroll' }}
      >
        <h4 className="l-50 f-600 text-primary">NFT</h4>
        {data &&
          data.map((item, index) => (
            <div key={index} className={`mt-32 d-flex`}>
              <img
                loading="lazy"
                className={`${styles['listing-img']}`}
                src={item.imageUrl}
              ></img>
              <div className={`col-12 ${styles['listing-content-wrapper']}`}>
                <h4 className="f-500 l-39">{item.name}</h4>
                <h5 className={`f-500 ${styles['listing-content-brands']}`}>
                  Brand
                </h5>
                <h4
                  className={`text-primary f-600 ${styles['listing-content-wine-name']}`}
                >
                  {item.brand.brandName}
                </h4>
                <div className="d-flex d-align-end gap-1">
                  <div className="col-5 d-flex d-flex-column gap-1">
                    <h5 className={`f-500 ${styles['listing-content-brands']}`}>
                      Price
                    </h5>
                    <div className="d-flex d-align-center gap-2">
                      <img
                        width="22px"
                        height="22px"
                        src="images/polygon-icon.svg"
                      ></img>
                      <h5 className={`f-500`}>{item.price} MATIC</h5>
                    </div>
                  </div>

                  {item.price != 0 && (
                    <div className="col-3 d-flex d-flex-column gap-1">
                      <h5
                        className={`f-500 ${styles['listing-content-brands']}`}
                      >
                        Expiry
                      </h5>
                      <div className="d-flex d-align-center ">
                        <h5 className={`f-500`}>{item.expiryDate}</h5>
                      </div>
                    </div>
                  )}
                  {item.price != 0 && (
                    <div
                      onClick={cancelListing}
                      className={`col-3 cursor-pointer d-flex d-justify-center d-align-center ${styles['cancel-listing']}`}
                    >
                      <h6 className="f-500 text-primary">Cancel Listing</h6>
                    </div>
                  )}
                </div>

                {item.price === 0 && (
                  <button className={`${styles['sell-now-btn']}`}>
                    <Link href={`/sellnft/${item._id}`}>Sell Now</Link>
                  </button>
                )}
              </div>
            </div>
          ))}
        <div
          className={`${styles['table-section-scroll']}`}
          style={{ overflow: 'hidden', paddingBottom: '100px', height: 'auto' }}
        >
          <div className={`${styles['table-wrapper']}`}>
            <h3 className={`f-600 text-primary ${styles['table-heading']}`}>
              Activity
            </h3>

            <div className={` ${styles['table-column']}`}>
              <span className="font-18 f-500 d-flex">Event</span>
              <span className="font-18 f-500 d-flex">Price</span>
              <span className="font-18 f-500 d-flex">From</span>
              <span className="font-18 f-500 d-flex">To</span>
              <span className="font-18 f-500 d-flex">Date</span>
            </div>

            {activity &&
              activity.map((item, index) => (
                <div key={index} className={`${styles['table-column']}`}>
                  <span className="font-18 f-500 d-flex">
                    {item.transactionType}
                  </span>
                  <div
                    className={`d-flex d-align-center gap-1 ${styles['price-column']}`}
                  >
                    {item.price === 0 ? (
                      ''
                    ) : (
                      <img src="images/polygon-icon.svg"></img>
                    )}
                    <span className="text-primary font-18 f-600">
                      {item.price === 0 ? ' ' : item.price}
                    </span>
                  </div>
                  <span className="text-primary font-18 f-500 d-flex">
                    {item.from &&
                      (item.from.name === null ? '-' : item.from.name)}
                  </span>
                  <span className="text-primary font-18 f-500 d-flex">
                    {item.to === null ? ' ' : item.to.name}
                  </span>
                  <span className="font-18 f-500 d-flex">
                    <Moment fromNow>{item.createdAt}</Moment>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      {add && (
        <Modal modalClass="modal-verify">
          <SellNow handler={modalHandler}></SellNow>
        </Modal>
      )}
      {cancelModal && (
        <Modal modalClass="modal-verify">
          <CancelListingModal
            cancelHandler={handlerCancelListing}
            handler={cancelListing}
          ></CancelListingModal>
        </Modal>
      )}
    </div>
  );
};

export default Listing;
