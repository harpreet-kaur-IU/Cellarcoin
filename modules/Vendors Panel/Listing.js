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
const Listing = () => {
  const router = useRouter();
  const nftId = router.query['id'];
  const [data, setData] = useState('');
  const [hasMount, setHasMount] = useState(false);
  const [add, setAdd] = useState('');
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState('');
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
        .then((response) => response.text())
        .then((result) => {
          const parseResult = JSON.parse(result);
          console.log(parseResult.data);
          setActivity(parseResult.data);
          setLoading(false);
        })
        .catch((error) => console.log('error', error));
    }
  }, [nftId]);

  return (
    <div>
      <Header></Header>
      {loading && <Loader></Loader>}
      <div
        className="vendor-container"
        style={{ paddingTop: '24px', height: '100vh', overflow: 'scroll' }}
      >
        <h4 className="l-50 f-600 text-primary">NFT</h4>
        {data &&
          data.map((item) => (
            <div className={`mt-32 d-flex`}>
              <img
                loading="lazy"
                className={`${styles['listing-img']}`}
                src={item.imageUrl}
              ></img>
              <div className={`col-5 ${styles['listing-content-wrapper']}`}>
                <h4 className="f-500 l-39">{item.name}</h4>
                <h5 className={`f-500 ${styles['listing-content-brands']}`}>
                  Brand
                </h5>
                <h4
                  className={`text-primary f-600 ${styles['listing-content-wine-name']}`}
                >
                  {item.brand.brandName}
                </h4>
                <h5 className={`f-500 ${styles['listing-content-brands']}`}>
                  Price
                </h5>
                <div className="mt-24 d-flex d-align-center gap-2">
                  <img src="images/polygon-icon.svg"></img>
                  <h4 className={`f-500`}>{item.price} MATIC</h4>
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
              activity.map((item) => (
                <div className={`${styles['table-column']}`}>
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
                    {item.from.name === null ? '-' : item.from.name}
                  </span>
                  <span className="text-primary font-18 f-500 d-flex">
                    {item.to === null ? '-' : item.to}
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
    </div>
  );
};

export default Listing;
