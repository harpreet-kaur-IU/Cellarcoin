import React,{useState,useEffect,useRef} from 'react'
import Modal from '../Vendors Panel/Modal'
import AddProperties from './AddProperties'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { getSubVendorOnBoardFromCookie } from '../../auth/userCookies';
import Header from './Header';
import styles from '../css/Sub Vendor Panel/CreateNFT.module.css';
import SmallLoader from '../Vendors Panel/SmallLoader';
import Loader from '../Vendors Panel/Loader';
const CreateNft = () => {
    const router = useRouter();
    const nftId = router.query["id"];
    const [fourth,setFourth] = useState({});
    const [fifth,setFifth] = useState({})
    const [data,setData] = useState("");
    const [add,setAdd] = useState(false);
    const [name,setName] = useState("");
    const [desc,setDesc] = useState("");
    //regex starts
    const regex = /^[^\s]+(\s+[^\s]+)*$/;
    const pattern = /[0-9]/g;
    const decimal = /^\d+(\.\d{1,2})?$/;
    const string = /^[a-zA-Z]*$/;
    //regex ends
    const [bottle,setBottleSize] = useState("");

    const [volume,setVolumn] = useState("");

    const [region,setRegion] = useState("")

    const [spirit,setSpirit] = useState("")

    const [wallet,setWallet] = useState("");
    
    const [premiumDrops,setPremiumDrops] = useState(false);

    const [additionalProps,setAdditionalProps] = useState("")
    const [additionalProps1,setAdditionalProps1] = useState("")
    const [cover,setCover] = useState(false);
    const [url,setUrl] = useState("");
    const [loading,setLoading] = useState(false);
    const [loadingImg,setLoadingImg] = useState(false);
    const [isUrl, setIsUrl] = useState(false);
    const [edit,setEdit] = useState(false)
    //error states starts
    const [isNameError,setNameError] = useState(false);
    const [isDescError,setDescError] = useState(false);
    const [coverError,setCoverError] = useState(false);
    const [isBottle,setBottleError] = useState(false);
    const [isVolumn,setVolumnError] = useState(false);
    const [isRegion,setRegionError] = useState(false);
    const [isSpirit,setSpiritError] = useState(false);
    //error states ends
    const [idUser,setUserId] = useState("");
    var JWTtoken = getSubVendorOnBoardFromCookie();

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

    const premiumHandler = () =>{
        setPremiumDrops(prev => !prev);
    }
    const coverHandler = (e) =>{
        
        // if(!e.target.files[0].name.match(/\.(jpg|png|gif)$/)){
            // setCoverError(true);
            // var inputfile = document.getElementById("file-input-field");
            // inputfile.value = "";
        // }   
        // else{
            // setCoverError(false);
            // var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
            // var fSize =  e.target.files[0].size; 
            // var i=0;
            // while(fSize>900){
            //   fSize/=1024;
            //   i++;
            // }
            // var file = (Math.round(fSize*100)/100);
            // if(i<=2 && file<10){
              setCover(e.target.files[0])
            // }
            // else{
            //     setCoverError(true);
            // }
        // }   
    }
    const additionalPropertyHandler = (data,data1) =>{
        setAdd(!add);
        setAdditionalProps(data);
        setAdditionalProps1(data1);
    }
    const validator = () =>{
        if(regex.test(name)){
            setNameError(false);
        }else{
            setNameError(true);
        }
        if(regex.test(desc)){
            setDescError(false);
        }else{
            setDescError(true);
        }

        if(url === ''){
            setIsUrl(true);
        }else{
            setIsUrl(false);
        }

        if(pattern.test(bottle)){
            setBottleError(false);
        }else{
            setBottleError(true);
        }

        if(decimal.test(volume)){
            setVolumnError(false);
        }else{
            setVolumnError(true);
        }

        if(string.test(region)){
            setRegionError(false);
        }else{
            setRegionError(true);
        }

        if(string.test(spirit)){
            setSpiritError(false);
        }else{
            setSpiritError(true);
        }
        if(!regex.test(name) || !regex.test(desc) || url === '' || !pattern.test(bottle) || !decimal.test(volume) || !string.test(region) || !string.test(spirit)){
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
                setEdit(true);
                setUrl(data[0].imageUrl)
                setName(data[0].name)
                setDesc(data[0].description)
                setWallet(data[0].walletAddress)
                setBrand(data[0].brand.brandName)
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

    useEffect(()=>{
        if(JWTtoken){
            function parseJwt() {
                if (!JWTtoken) {return}
                const base64Url = JWTtoken.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse(window.atob(base64));
            }
            var user = parseJwt();
            setUserId(user.user._id)
        }
    },[])
    
    const modalHandler = () =>{
        setAdd(!add);
    }
    const mint = async(abb)=>{
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        
        if(typeof window.ethereum !== "undefined"){
            const contractAddress = "0xDf00126C37EFB27e60F53c520364763fc99e7F2B";
            const contract = new ethers.Contract(
                contractAddress,
                Nft_marketplace_ABI,
                signer
            );
            try{
                await contract.nftMint(
                    addr,
                    abb,
                    "Cellarcoin",
                    "2400",
                    "Heloo",
                    "Nothing"
                )
                .then(response =>{
                    createNFT(response,addr)
                })
            }catch(error){
                console.log(error);
            }
        }else{
            console.log("Please install MetaMask");
        }
    }
    const getToken = (raw) =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type","application/json");

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}nft/mintNFT`,{
            method: 'POST', 
            headers: myHeaders,
            body: raw
        })

        .then(response => response.json())
        .then(results => {
            mint(results.data)
        }) // fourth call
        .catch(error => console.log('error', error))
    }   
    const walletConnected = async() =>{
        const { ethereum } = window;
        if (ethereum) {
            var provider = new ethers.providers.Web3Provider(ethereum);
        }
        const isMetaMaskConnected = async () => {
            const accounts = await provider.listAccounts();
            return accounts.length > 0;
        }
        await isMetaMaskConnected().then((connected) => {
            if(connected) {
                checkValidation() // second call
            }else{
                toast.warning("Please Connect Your Wallet",{
                    toastId:"2"
                });
            }
        });
    }
    const createNFT = (response,walletAddress) =>{5
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
            "isPremiumDrop":premiumDrops,
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
                // router.push("/allnftlist")
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
                setName("")
                setDesc("")
                setWallet("")
                setUrl("")
                setPremiumDrops(false)
                setBottleSize("")
                setVolumn("")
                setRegion("")
                setSpirit("")
                setCover("")
                var inputfile = document.getElementById("file-input-field");
                inputfile.value = "";
                addTransaction(response.hash,result.data._id,walletAddress)
            })
            .catch(error => console.log('error', error));
        } 
    }
    const addTransaction = (hash,id,walletAddress) =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTtoken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "walletAddressFrom": walletAddress,
            "walletAddressTo": "",
            "hash": hash,
            "tokenId": "4t57y7u8i9o0op",
            "transactionType": "minted"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/createOrder/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    const checkValidation = () =>{
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

            var tokenBody = JSON.stringify({
                "file":url,
                "name":name,
                "description":desc,
                "external_url":"https://bigfatcats.io",
                "attributes":attributes,
            });
            
            // get token and mint function call
            getToken(tokenBody) // third call
        }
    }
    const formSubmit = (e) =>{
        e.preventDefault();
        walletConnected(); // first call
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
                        <h6 className={`f-400 l-25 ${styles["create-nft-file-format"]}`}>File types supported: JPG, PNG, GIF. Max size: 10 MB</h6>
                        <div className={`d-flex d-flex-column d-align-center d-justify-center ${styles["image-input-wrapper"]}`}  style={{backgroundImage:`url(${url})`,backgroundRepeat: 'no-repeat',backgroundSize: 'contain',backgroundPosition: 'center'}}>
                            <input
                                id='file-input-field'
                                type='file'
                                ref={fileRef}
                                multiple={false}
                                onChange={coverHandler}
                            />  
                            {!loadingImg && !url && <img src="images/nft-image-icon.png"></img>}
                            {loadingImg && <SmallLoader></SmallLoader>}
                        </div>
                        {coverError && <h6 className={`mt-24 font-14 f-700 text-danger`}>File types supported: JPG, PNG, GIF. Max size: 10 MB</h6>}
                        {isUrl && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please upload NFT Image.</span>}
                        <div className={`d-flex d-flex-column ${styles["name-input"]}`}>
                            <h5 className='font-24 f-600 l-33'>Name</h5>
                            <input value={name} onChange={nameHandler} type="text" required></input>
                        </div>
                        {isNameError && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Enter NFT Name.</span>}
                        <div className={`d-flex d-flex-column ${styles["desc-input"]}`}>
                            <h5 className='font-24 f-600 l-33'>Description</h5>
                            <h6 className='font-18 f-400 l-25'>The description will be included on the item's detail page underneath its image.</h6>
                            <input value={desc} onChange={descHandler} type="text" required></input>
                        </div>
                        {isDescError && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Enter NFT Description.</span>}
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
                                    {isBottle && <h6 className={`mt-24 font-14 f-700 text-danger`}>Please enter numbers only.</h6>}
                                </div>
                                
                                <div className={`col-5 offset-2 ${styles["properties-name-wrapper"]}`}>
                                    <h5 className='font-24 f-600 l-33'>Alcohol by volume(ABV)</h5>
                                    <input value={volume} onChange={volumeHandler} className='col-12'></input>
                                    {isVolumn && <h6 className={`mt-24 font-14 f-700 text-danger`}>Please enter numbers only.</h6>}
                                </div>
                            </div>
                            
                            <div className={`d-flex d-flex-wrap ${styles['properties-wrapper']}`}>
                                <div className={`col-5 ${styles["properties-name-wrapper"]}`}>
                                    <h5 className='font-24 f-600 l-33'>Region</h5>
                                    <input value={region} onChange={regionHandler} className='col-12'></input>
                                    {isRegion && <h6 className={`mt-24 font-14 f-700 text-danger`}>Please enter string only.</h6>}
                                </div>
                                <div className={`col-5 offset-2 ${styles["properties-name-wrapper"]}`}>
                                    <h5 className='font-24 f-600 l-33'>Spirit</h5>
                                    <input value={spirit} onChange={spiritHandler} className='col-12'></input>
                                    {isSpirit && <h6 className={`mt-24 font-14 f-700 text-danger`}>Please enter string only.</h6>}
                                </div>
                            </div>
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

export default CreateNft