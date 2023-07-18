import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import Loader from '../Vendors Panel/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Delete from './Delete';
import { getSubVendorOnBoardFromCookie } from '../../auth/userCookies';
import styles from '../css/Sub Vendor Panel/Dashboard.module.css';
import Header from './Header';
import Link from 'next/link';
import StatusDropdown from '../Vendors Panel/StatusDropdown';
function useOutsideAlerter(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
const ListNFT = () => {
  const [data, setData] = useState('');
  const [searchData, setSearchData] = useState('');
  // const[isDelete,setDelete] = useState(false);
  // const[deleteUserId,setDeleteUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  //dropdown collapse
  const wrapperRef = useRef(null);
  const handler = () => {
    setDropdown(false);
  };
  useOutsideAlerter(wrapperRef, handler);
  // const dropdownHandler = () =>{
  //     setDropdown(!dropdown);
  // }
  const router = useRouter();
  var JWTtoken = getSubVendorOnBoardFromCookie();

  const createHandler = () => {
    router.push('/createnftsubvendor');
  };

  useEffect(() => {
    if (JWTtoken) {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + JWTtoken);
      myHeaders.append('Content-Type', 'application/json');

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      setLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNft?status=null`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.data);
          setLoading(false);
        })
        .catch((error) => console.log('error', error));
    } else {
      router.push('/vendorlogin');
    }
  }, []);

  const searchHandler = (e) => {
    setSearchData(data);
    if (e.target.value.length > 2) {
      setTimeout(() => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + JWTtoken);
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
        };
        setLoading(true);
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNftByName?search=${e.target.value}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setData(result.data);
            setLoading(false);
          })
          .catch((error) => console.log('error', error));
      }, '1000');
    } else if (e.target.value.length <= 2) {
      setData(searchData);
    }
  };
  // const DeleteModal = () =>{
  //     setDelete(prev => !prev)
  // }
  // const deleteModalClicked = (e) =>{
  //     setDelete(prev => !prev);
  //     setDeleteUserId(e.target.id);
  // }

  const removeNFT = async () => {
    console.log(data.tokenId);
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
          contract;
          RemoveNFTForSale(tokenid)
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

  const statusHandler = (data) => {
    if (data === 'All') {
      data = null;
    }
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + JWTtoken);
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNft?status=${data}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  };
  // const deleteNFT = (response,walletAddress) =>{
  //     var myHeaders = new Headers();
  //     myHeaders.append("Authorization","Bearer "+JWTtoken);
  //     myHeaders.append("Content-Type","application/json");

  //     var requestOptions = {
  //         method: 'PATCH',
  //         headers: myHeaders,
  //     };
  //     setLoading(true)
  //     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/deleteNft/${deleteUserId}`, requestOptions)
  //     .then(response => response.json())
  //     .then(result =>{
  //         fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNft?status=null`,{
  //             method: 'GET',
  //             headers: myHeaders,
  //         })
  //         .then(response => response.json())
  //         .then(results =>{
  //             setData(results.data)
  //             addTransaction(response.hash,deleteUserId,walletAddress)
  //         })
  //         setDelete(prev => !prev)
  //         setLoading(false)
  //         .catch(error => console.log('error', error))

  //     })
  //     .catch(error => console.log('error', error));
  // }

  const addTransaction = (hash, id, walletAddress) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + JWTtoken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      walletAddressFrom: walletAddress,
      walletAddressTo: '',
      hash: hash,
      tokenId: '4t57y7u8i9o0op',
      transactionType: 'listed',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}user/createOrder/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        toast.success('NFT Deleted Successfully', {
          toastId: '2',
        });
      })
      .catch((error) => console.log('error', error));
  };
  // const deleteHandler = () =>{
  //     removeNFT();
  // }

  return (
    <>
      {loading && <Loader></Loader>}
      <Header></Header>
      <div className="vendor-container">
        <div className="d-flex d-align-center d-justify-space-between">
          <h4 className="f-600 text-primary mt-24 mb-24">NFT List</h4>
          <div className="d-flex d-align-center gap-4">
            <StatusDropdown handler={statusHandler}></StatusDropdown>
            <div
              className={`d-flex d-align-center rounded-16 ${styles['header-search-box']}`}
            >
              <img src="images/search-icon-v.png"></img>
              <form>
                <input
                  onChange={searchHandler}
                  type="text"
                  placeholder="Search"
                />
              </form>
            </div>
            <div
              className={`d-none d-flex d-align-center d-justify-center ${styles['create-nft-div']}`}
            >
              <button onClick={createHandler} className="font-12 f-600 b-none">
                Create NFT
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles['dashboard-table-section-scroll']}`}>
          <div className={`${styles['dashboard-table-wrapper']}`}>
            <div
              className={`${styles['dashboard-table-column']} bg-orange d-flex d-align-center`}
            >
              <span className="font-16 f-600 d-flex">NFT</span>
              <span className="font-16 f-600 d-flex">Title</span>
              <span className="font-16 f-600 d-flex">Brand</span>
              <span className="font-16 f-600 d-flex">Status</span>
              <span className="font-16 f-600 d-flex">Price</span>
              <span className="font-16 f-600 d-flex">Created On</span>
              <span className="font-16 f-600 d-flex d-justify-space-evenly">
                Action
              </span>
            </div>
            {data &&
              data.map((item, index) => (
                <div
                  className={`${styles['dashboard-table-column']} ${styles['dashboard-table-column-data']} d-flex d-align-center`}
                >
                  <span className="font-14 f-500 d-flex">
                    <img
                      loading="lazy"
                      className={`${styles['dashboard-table-column-product']}`}
                      src={item.imageUrl}
                    ></img>
                  </span>
                  <span className="font-14 f-500 d-flex word-break">
                    {item.name}
                  </span>
                  <span className="font-14 f-600 text-primary text-underline d-flex">
                    {item.brand.brandName}
                  </span>
                  <div className="d-flex">
                    {item.status === 'expired' ? (
                      <span
                        className={`font-14 f-500 ${styles['nft-status-expired']}`}
                      >
                        expired
                      </span>
                    ) : (
                      <span
                        className={`font-14 f-500 ${styles['nft-status-green']}`}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                  {item.price === 0 ? (
                    <span
                      className={`p-relative font-14 f-500 d-flex d-align-center`}
                    >
                      --
                    </span>
                  ) : (
                    <span
                      className={`p-relative font-14 f-500 d-flex d-align-center ${styles['nft-price-wrapper']}`}
                    >
                      <img
                        className={`${styles['polygon-icon-img']}`}
                        src="images/polygon-icon.svg"
                      ></img>
                      {item.price}
                      <div
                        className={`d-flex d-align-center d-justify-center ${styles['nft-price-tool-tip']}`}
                      >
                        <h6 className="l-22 f-400">MATIC</h6>
                      </div>
                    </span>
                  )}
                  <span className="font-14 f-500 d-flex">
                    {item.createdTime}
                  </span>
                  <span
                    className={`font-14 f-500 d-flex d-align-center d-justify-center`}
                    style={{ gap: '37px' }}
                  >
                    <Link href={`/subvendorListing/${item._id}`}>
                      <img
                        className="cursor-pointer"
                        src="images/Eye Icon.png"
                      ></img>
                    </Link>
                    <Link href={`/createnftsubvendor/${item._id}`}>
                      <img
                        className="cursor-pointer"
                        src="images/edit-2.svg"
                      ></img>
                    </Link>
                    {/* {item.status !== "minted" &&
                                    <img className='cursor-pointer' id={item._id} onClick={deleteModalClicked} src='images/Delete.png'></img>
                                } */}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <ToastContainer />
      {/* {isDelete && <Modal modalClass="modal-verify">
          <Delete deleteHandler={deleteHandler} handler={DeleteModal}></Delete>
        </Modal>} */}
    </>
  );
};

export default ListNFT;
