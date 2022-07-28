import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";

import {useEffect, useState} from 'react'
import Axios from 'axios'

import './profilePageStyling.css'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PersonIcon from '@mui/icons-material/Person';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import { Buffer } from 'buffer';
import MarketplaceCard from "../marketplaceCard/marketplaceCard";

import {Modal, Fade, Box, Button, Card, CardActionArea} from '@mui/material'
import ViewOption from '../ViewOption/ViewOption'

export default function ProfilePage()
{

    const [isUserOnMarketplaces, setIsUserOnMarketplaces] = useState(true)
    const [isUserOnProducts, setIsUserOnProducts] = useState(false)
    const [isUserOnReviews, setIsUserOnReviews] = useState(false)

    const [userData, setUserData] = useState('')

    const [pfpModalState, setPfpModalState] = useState(false)

    let URL_ID = window.location.href.split('/')[4]


    const openPFPModal = () => {
        setPfpModalState(true)
    }

    const closePFPModal = () => {
        setPfpModalState(false)
    }
    
    useEffect(() => {
        Axios.get('http://localhost:3001/getCurrentUserSession', {withCredentials: true})
        .then((res) => {
            let userID = res.data.user.id

            let userDataObj = {
                
            }
            Axios.post('http://localhost:3001/getUserById', {id: URL_ID})
            .then((res) => {
                let userMarketplaces = res.data.marketplaces
                let userRating = res.data.rating
                let userReviews = res.data.reviews
                let profilePicture = res.data.profilePicture
                let username = res.data.username

                userDataObj.marketplaces = userMarketplaces
                userDataObj.rating = userRating
                userDataObj.reviews = userReviews
                userDataObj.profilePicture = profilePicture
                userDataObj.username = username
                userDataObj.coverPicture = res.data.covertPicture

                if(userID == URL_ID)
                {
                    userDataObj.isOwner = true
                }
                else
                {
                    userDataObj.isOwner = false
                }

                setUserData(userDataObj)
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const openImageUploadField = () => {
        let imgInputField = document.querySelector('.imageUploadButton')
        imgInputField.click()
    }

    const changePFP = () =>
    {
            let imgInputField = document.querySelector('.imageUploadButton')

            let newPFP = imgInputField.files[0]
            let formData = new FormData()
            formData.append('userID', URL_ID)
            formData.append('pfp', newPFP)

            Axios.post('http://localhost:3001/uploadProfilePicture', formData)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

        
    }
    
    const openCoverUploadField = () => {
        let coverInputField = document.querySelector('.coverUpload')
        coverInputField.click()
    }

    const changeCoverPicture = () => {
        let coverInputField = document.querySelector('.coverUpload')
        let newCoverPicture = coverInputField.files[0]

        let formData = new FormData()
        formData.append('userID', URL_ID)
        formData.append('pfp', newCoverPicture)

        Axios.post('http://localhost:3001/uploadCoverPicture', formData)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const viewPFP_modalEnlargement = {
        position: 'absolute',
        left: "36%",
        top: "18%"
    }

    const handleMarketplacesView = () => {

            setIsUserOnMarketplaces(true)
            setIsUserOnProducts(false)
            setIsUserOnReviews(false)
        
        console.log(isUserOnMarketplaces)
    }

    const handleProductsView = () => {

            setIsUserOnProducts(true)
            setIsUserOnMarketplaces(false)
            setIsUserOnReviews(false)
        
        console.log(isUserOnMarketplaces)
    }

    const handleReviewsView = () => {
        
            setIsUserOnProducts(false)
            setIsUserOnMarketplaces(false)
            setIsUserOnReviews(true)
        
        console.log(isUserOnMarketplaces)
    }
    return (
        <div>
            <Navbar/>
                <div className="profilePageWrapper">
                    {
                        userData.isOwner 
                        ?                     
                            <div className="profileWrapper">
                                { userData.coverPicture != undefined ?
                                
                                    <div className="coverPictureWrapper">
                                        <LocalSeeIcon className='coverUploadButton' onClick={() => openCoverUploadField()}/>
                                        <img className="coverPicture" 
                                            src={
                                                `data: image/jpg;base64,
                                                ${Buffer.from(userData.coverPicture.data).toString('base64')}`
                                                }/>

                                        <input type="file" className="coverUpload" hidden onChange={() => changeCoverPicture()}/>
                                    </div>  
                                    :
                                        <div className="coverPictureWrapper">
                                        <LocalSeeIcon className='coverUploadButton' onClick={() => openCoverUploadField()}/>
                                        <input type="file" className="coverUpload" hidden onChange={() => changeCoverPicture()}/>
                                </div>  
                                }

                                { userData.profilePicture == undefined
                                    ? 
                                    <div className="profilePictureWrapper" onClick={() => openImageUploadField()}>
                                        <UploadFileIcon className="uploadPfpIcon"/>
                                        <input type="file" className="imageUploadButton" hidden onChange={() => changePFP()}/>
                                    </div>
                                    :
                                    <div className="profilePictureWrapper" onClick={() => openImageUploadField()}>
                                        <img className="profilePicture" 
                                            src={
                                                `data: image/jpg;base64,
                                                ${Buffer.from(userData.profilePicture.data).toString('base64')}`
                                                }/>
                                            <input type="file" className="imageUploadButton" hidden onChange={() => changePFP()}/>
                                        </div>

                                }


                                <div className="profileName">
                                    <h1>{userData.username}</h1>
                                </div>

                            </div> 
                        : 
                        <div className="profileWrapper">
                            
                            <div className="coverPictureWrapper">
                                { userData.coverPicture != undefined ?
                                    
                                    <div className="coverPictureWrapper">
                                        <img className="coverPicture" 
                                            src={
                                                `data: image/jpg;base64,
                                                ${Buffer.from(userData.coverPicture.data).toString('base64')}`
                                                }/>

                                    </div>  
                                    :
                                        <div className="coverPictureWrapper">
                                            
                                        </div>  
                                }
                            </div>

                            { userData.profilePicture == undefined
                                    ? 
                                    <div className="profilePictureWrapper" >
                                        <PersonIcon className="uploadPfpIcon"/>
                                    </div>
                                    :
                                    <div>
                                        <div className="profilePictureWrapper" onClick={() => openPFPModal()}>
                                            <img className="profilePicture" 
                                                src={
                                                    `data: image/jpg;base64,
                                                    ${Buffer.from(userData.profilePicture.data).toString('base64')}`
                                                    }/>
                                        </div>
                                        <div>
                                            <Modal open={pfpModalState} onClose={closePFPModal}>
                                                <Fade in={pfpModalState}>
                                                    <Box sx={viewPFP_modalEnlargement}>
                                                        <img  width="480px" height="480px"
                                                            src={
                                                            `data: image/jpg;base64,
                                                            ${Buffer.from(userData.profilePicture.data).toString('base64')}`
                                                            }/>
                                                    </Box>
                                                </Fade>
                                            </Modal>
                                        </div>
                                    </div>
                                }


                            <div className="profileName">
                                <h1>{userData.username}</h1>
                            </div>

                        </div>
                    }
                </div>
                
                <div className="profilePageViewOptions">
                    <ViewOption optionName = "Marketplaces" clickAction = { handleMarketplacesView }/>

                    <ViewOption optionName = "Products"  clickAction = { handleProductsView }/>

                    <ViewOption optionName = "Reviews"  clickAction = { handleReviewsView }/>
                </div>

                <div className="marketplaceOptionsWrapper">

                    <div className="marketplaceViews">
                        {
                            isUserOnMarketplaces == true ?
                        
                            <div className="marketplacesWrapper">
                                {
                                        userData.marketplaces && 
                                        userData.marketplaces.length >= 1 ?
                                        userData.marketplaces.map(( marketplace ) => {
                                            return (
                                                <MarketplaceCard TargetMarketplace = {marketplace} />
                                            )
                                        })
                                        : 
                                        <p>This user does not have any marketplaces yet</p>

                                }
                            </div>
                            :
                            ""
                        }
                    </div>

                    <div>
                    {
                            isUserOnProducts == true ?
                                <div className="ProductsView view" onClick={ () => handleProductsView() }>
                                    {
                                        userData.products && 
                                        userData.products.length >= 1 ?
                                        userData.products.map(( product ) => {
                                            //  return (
                                            //      <ProductCard TargetProduct = {product} />
                                            //  )
                                        })
                                        :
                                        <p>"This user does not have any products yet</p>
                                    }
                                </div>
                            : ""
                    }
                    </div>

                    <div>
                        {isUserOnReviews == true ?
                            <div className="ReviewsView view" onClick={ () => handleReviewsView() }>
                                {

                                        userData.reviews &&
                                        userData.reviews.length >= 1 ?
                                        userData.reviews.map(( review ) => {

                                            // return (
                                            //     <ReviewCard TargetReview = { review } />
                                            // )
                                        })
                                        :
                                        <p> No reviews left yet</p>
                                }
                            </div>
                        : ""}
                    </div>
                </div>

            <Footer/>
        </div>
    )
    
}
