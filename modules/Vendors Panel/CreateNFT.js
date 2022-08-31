import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import styles from '../css/Vendor Panel/CreateNFT.module.css'
import AddProperties from './AddProperties'
import Modal from './Modal'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import {useRouter} from 'next/router'
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SmallLoader from './SmallLoader';

const CreateNFT = () => {
    const Web3 = require('web3');
    const router = useRouter();
    const nftId = router.query["id"];
    const [fourth,setFourth] = useState({});
    const [fifth,setFifth] = useState({})
    const [data,setData] = useState("");
    const [add,setAdd] = useState(false);
    const [name,setName] = useState(" ");
    const [desc,setDesc] = useState(" ");

    const [bottle,setBottleSize] = useState(" ");

    const [volume,setVolumn] = useState(" ");

    const [region,setRegion] = useState("")

    const [spirit,setSpirit] = useState("")

    const [brand,setBrand] = useState("");
    const [wallet,setWallet] = useState("");
    
    const [premiumDrops,setPremiumDrops] = useState(false);

    const [additionalProps,setAdditionalProps] = useState("")
    const [additionalProps1,setAdditionalProps1] = useState("")
    const [cover,setCover] = useState(false);
    const [url,setUrl] = useState("");
    const [loading,setLoading] = useState(false);
    const [loadingImg,setLoadingImg] = useState(false);
    const [isUrl, setIsUrl] = useState(false);
    const [isNameError,setNameError] = useState(false);
    var JWTtoken = getOnBoardFromCookie();

    const fileRef = useRef(); 
    const premium = useRef(null);

    const nameHandler = (e) =>{
        setName(e.target.value); 
    }
    const descHandler = (e) =>{
        setDesc(e.target.value); 
    }
    const bottleHandler = (e) =>{
        setBottleSize(e.target.value);
    }
    const volumeHandler = (e) =>{
        setVolumn(e.target.value);
    }
    const regionHandler = (e) =>{
        setRegion(e.target.value);
    }
    const spiritHandler = (e) =>{
        setSpirit(e.target.value);
    }
    const brandHandler = (e) =>{
        setBrand(e.target.value);
    }
    const walletHandler = (e) =>{
        setWallet(e.target.value)
    }
    const premiumHandler = () =>{
        setPremiumDrops(prev => !prev);
    }
    const coverHandler = (e) =>{
        setCover(e.target.files[0]); 
    }
    const additionalPropertyHandler = (data,data1) =>{
        setAdd(!add);
        setAdditionalProps(data);
        setAdditionalProps1(data1);
    }

    const validator = () =>{
        if(name === ' '){
            setNameError(true);
        }else{
            setNameError(false);
        }
        if(url === ''){
            setIsUrl(true);
        }else{
            setIsUrl(false);
        }
        if(name === ' ' || url === ' '){
            return false;
        }else{
            return true;
        }
    }


    useEffect(()=>{
        if(JWTtoken){
            if(nftId){
                var myHeaders = new Headers();
                myHeaders.append("Authorization","Bearer "+JWTtoken);
                myHeaders.append("Content-Type","application/json");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders
                };
                setLoading(true)
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNftById/${nftId}`, requestOptions)
                .then(response => response.json())
                .then(result =>{
                    setData(result.data)
                    setLoading(false)
                })
                .catch(error => console.log('error', error));
            }
            
            if(cover){
                var formdata = new FormData();
                formdata.append("image",cover);
                
                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };
                setLoadingImg(true)
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}uploadImage`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    var results = (JSON.parse(result))
                    setUrl(results.imageUrl)
                    setLoadingImg(false)
                })
                .catch(error => console.log('error', error));
            }
        }else{
            router.push("/vendorlogin")
        }
    },[cover,nftId])
    useEffect(()=>{
        if(JWTtoken){
            if(data){
                setUrl(data[0].imageUrl)
                setName(data[0].name)
                setDesc(data[0].description)
                setWallet(data[0].walletAddress)
                setBrand(data[0].brand)
                setPremiumDrops(data[0].isPremiumDrop)
                const attributes = data[0].attributes;
                for(var i=0;i<attributes.length;i++){
                    if(attributes[i].trait_type === "Bottle Size"){
                        setBottleSize(attributes[i].value);
                    }
                    else if(attributes[i].trait_type === "Alcohol by volume"){
                        setVolumn(attributes[i].value);
                    }
                    else if(attributes[i].trait_type === "Region"){
                        setRegion(attributes[i].value);
                    }
                    else if(attributes[i].trait_type === "Spirit"){
                        setSpirit(attributes[i].value);
                    }
                    else if(i == 4){
                        setFourth(attributes[i]);
                    }
                    else if(i == 5){
                        setFifth(attributes[i]);
                    }
                }
            }
        }else{
            router.push("/vendorlogin")
        }
    },[data])
    
    const modalHandler = () =>{
        setAdd(!add);
    }
  
    const formSubmit = (e) =>{
        // const web3 = new Web3("https://bsc-dataseed1.defibit.io/");
        // const contract = await new web3.eth.Contract(contractAbi, contractAddress);

        // await contract.methods
        // .mint(/*All the arguments that are in the mint function in SC*/)
        // .send({from : account /*acccount connected account*/})
        // .on("error", (error) => {
        //     console.log(error);
        // })
        // .then((receipt) => {
		//     console.log(receipt)
        // })

        e.preventDefault();
        const result = validator();
        if(result){    
            const attributes = [
                {
                    "trait_type":"Bottle Size",
                    "value":bottle
                },
                {
                    "trait_type":"Alcohol by volume",
                    "value":volume
                },
                {
                    "trait_type":"Region",
                    "value":region
                },
                {
                    "trait_type":"Spirit",
                    "value":spirit
                },
                {...additionalProps},
                {...additionalProps1}
            ]
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+JWTtoken);
            myHeaders.append("Content-Type","application/json");

            var raw = JSON.stringify({
                "name":name,
                "imageUrl":url,
                "description":desc,
                "attributes":attributes,
                "walletAddress":wallet,
                "brand":brand,
                "isPremiumDrop":premiumDrops
            });
            if(nftId){
                var requestOptions = {
                    method: 'PATCH',
                    headers: myHeaders,
                    body: raw
                };
                setLoading(true)
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/editNft/${nftId}`, requestOptions)
                .then(response => response.json())
                .then(result =>{ 
                    setData(result.data)
                    setLoading(false)
                    router.push("/allnftlist")
                })
                .catch(error => console.log('error', error));
            }
            else{
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw
                };
                setLoading(true)
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/addNft`, requestOptions)
                .then(response => response.json())
                .then(result =>{ 
                    setLoading(false)
                    toast.success("NFT Created Successfully",{
                        toastId:"2"
                    });
                    setName("")
                    setDesc("")
                    setWallet("")
                    setBrand("")
                    setUrl("")
                    setPremiumDrops(false)
                    setBottleSize("")
                    setVolumn("")
                    setRegion("")
                    setSpirit("")
                })
                .catch(error => console.log('error', error));
            }  
        }
    }
  return (
    <div>
        {loading && <Loader></Loader>}
        <Header></Header>
        <div style={{height:"100vh",overflow:"scroll"}}>
            <div className={`col-9 vendor-container ${styles["vendor-container"]}`}>
                <h4 className='l-50 f-600 text-primary mt-24'>Create NFT</h4>
                <form onSubmit={formSubmit}>
                    <div className={`d-flex d-flex-column ${styles["create-nft-wrapper"]}`}>
                        <h5 className='l-33 f-600'>Image, Video, Audio, or 3D Model</h5>
                        <h6 className={`f-400 l-25 ${styles["create-nft-file-format"]}`}>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</h6>
                        <div className={`d-flex d-flex-column d-align-center d-justify-center ${styles["image-input-wrapper"]}`}  style={{backgroundImage:`url(${url})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center'}}>
                            <input
                                type='file'
                                ref={fileRef}
                                multiple={false}
                                onChange={coverHandler}
                                // required
                            />  
                            {!loadingImg && !url && <img src="images/nft-image-icon.png"></img>}
                            {loadingImg && <SmallLoader></SmallLoader>}
                            {/* {url && <p className='l-22 f-600 mt-14 text-primary'>Image Uploaded Successfully</p>} */}
                        </div>
                        {isUrl && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please upload NFT Image.</span>}
                        <div className={`d-flex d-flex-column ${styles["name-input"]}`}>
                            <h5 className='font-24 f-600 l-33'>Name</h5>
                            <input value={name} onChange={nameHandler} type="text" required></input>
                        </div>
                        {isNameError && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Enter NFT Name.</span>}
                        <div className={`d-flex d-flex-column ${styles["desc-input"]}`}>
                            <h5 className='font-24 f-600 l-33'>Description</h5>
                            <h6 className='font-18 f-400 l-25'>The description will be included on the item's detail page underneath its image. </h6>
                            <input value={desc} onChange={descHandler} type="text" required></input>
                        </div>
                        <div className={`d-flex d-flex-column ${styles["properties-input"]}`}>
                            <div className='d-flex d-align-center d-justify-space-between'>
                                <div className='d-flex d-flex-column'>
                                    <h5 className='font-24 f-600 l-33'>Properties</h5>
                                    <h6 className='font-18 f-400 l-25'>Textual traits that show up as rectangles.</h6>
                                </div>
                                <div onClick={modalHandler} className={`cursor-pointer d-flex d-align-center d-justify-center ${styles["property-add-btn"]}`}>
                                    <img src='images/plus-icon.png'></img>
                                </div>
                            </div>
                            <div className={`d-flex d-flex-wrap ${styles["properties-wrapper"]}`}>
                                <div className={`col-5 ${styles["properties-name-wrapper"]}`}>
                                    <h5 className='font-24 f-600 l-33'>Bottle Size</h5>
                                    <input value={bottle} onChange={bottleHandler} className='col-12'></input>
                                </div>
                                <div className={`col-5 offset-2 ${styles["properties-name-wrapper"]}`}>
                                    <h5 className='font-24 f-600 l-33'>Alcohol by volume(ABV)</h5>
                                    <input value={volume} onChange={volumeHandler} className='col-12'></input>
                                </div>
                            </div>
                            <div className={`d-flex d-flex-wrap ${styles['properties-wrapper']}`}>
                                <div className={`col-5 ${styles["properties-name-wrapper"]}`}>
                                    <h5 className='font-24 f-600 l-33'>Region</h5>
                                    <input value={region} onChange={regionHandler} className='col-12'></input>
                                </div>
                                <div className={`col-5 offset-2 ${styles["properties-name-wrapper"]}`}>
                                    <h5 className='font-24 f-600 l-33'>Spirit</h5>
                                    <input value={spirit} onChange={spiritHandler} className='col-12'></input>
                                </div>
                            </div>
                        </div>
                        {/* <div className={`d-flex d-flex-column ${styles["desc-input"]}`}>
                            <h5 className='font-24 f-600 l-33'>Enter you wallet address</h5>
                            <h6 className='font-18 f-400 l-25'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</h6>
                            <input type="text" value={wallet} onChange={walletHandler}></input>
                        </div> */}
                        <div className={`d-flex d-flex-column ${styles["desc-input"]}`}>
                            <h5 className='font-24 f-600 l-33'>Enter your Brand Name</h5>
                            <h6 className='font-18 f-400 l-25'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</h6>
                            <input type="text" value={brand} onChange={brandHandler} required></input>
                        </div>
                        <div className={`d-flex d-flex-column ${styles["post-input"]}`}>
                            <h5 className='font-24 f-600 l-33'>Post This to</h5>
                            <div className={`d-flex d-align-center ${styles["checkbox-text"]}`}>
                                {premiumDrops === true?<input type="checkbox" ref={premium} onChange={premiumHandler} checked></input>:<input type="checkbox" ref={premium} onChange={premiumHandler}></input>}
                                <h5 className='f-500 l-28'>Premium Drops</h5>
                            </div>
                        </div>
                      
                        <div className='d-flex d-justify-end'>
                            <button className={`font-18 f-700 l-27 bg-primary ${styles["submit-btn"]}`}>Submit</button>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
        <ToastContainer />
        {add && 
            <Modal modalClass="modal-verify">
                <AddProperties opt1={fourth} opt2={fifth} data={additionalPropertyHandler} handler={modalHandler}></AddProperties>
            </Modal>
        }
    </div>
    
  )
}

export default CreateNFT

