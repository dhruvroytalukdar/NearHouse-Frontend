import {useState} from 'react'
import ImageGallery from "react-image-gallery"
import Link from 'next/link'

export default function RentalItem({rentalData}) {

    const [liked,setLiked] = useState(false)

    function getImages(data){
        let images = [{original:data.estate.mainImage.url}]
        for(let image of data.estate.images)
            images.push({original:image.url})
        return images
    }

    function isMultiple(n){
        return n==1 ? '' : 's'
    }


    return (
        <div className="w-full lg:p-4 px-2 lg:py-2 py-6 border-2 rounded-lg shadow flex space-around items-center lg:flex-row flex-col">
            <div className="w-80 lg:w-72 rounded-xl">
                <ImageGallery showNav={false} showBullets={true} infinite={true} showFullscreenButton={false} showPlayButton={false} items={getImages(rentalData)} />
            </div>
            <div className="w-11/12 lg:w-8/12 lg:ml-6 lg:mt-0 mt-3 space-y-2">
                <div className="w-full flex pt-3">
                    <p className="lg:text-xl text-2xl font-semibold pt-2">{rentalData.title}</p>
                    <button className="ml-auto lg:p-1.5 w-12 h-12 rounded-full lg:hover:bg-gray-200" onClick={()=>setLiked(!liked)}>
                        { liked ? 
                        <img className="w-6 m-auto" src='/svg/solidfavorite.png' />
                        :<img className="w-6 m-auto" src="/svg/outlineheart.svg" />}        
                    </button>
                </div>
                <p className="lg:text-base text-lg text-gray-900">{rentalData.estate.address}</p>
                <div className="w-full flex lg:space-x-3 space-between">
                    <p className="inline lg:text-sm text-md text-gray-800 mr-1">{rentalData.estate.bedroom} Bedroom{isMultiple(rentalData.estate.bedroom)}</p>
                    <p className="inline lg:text-sm text-md text-gray-800 mx-1">{rentalData.estate.beds} Bed{isMultiple(rentalData.estate.beds)}</p>
                    <p className="inline lg:text-sm text-md text-gray-800 mx-1">{rentalData.estate.kitchen} Kitchen{isMultiple(rentalData.estate.kitchen)}</p>
                    <p className="inline lg:text-sm text-md text-gray-800 ml-1">{rentalData.estate.bathroom} Bathroom{isMultiple(rentalData.estate.bathroom)}</p>
                </div>
                <div className="grid lg:gap-2 gap-1 grid-cols-2">
                    { rentalData.estate.keyFeatures.map((feature) => (
                        <p className="text-sm text-gray-800" key={feature}>&#10040; {feature}</p>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <Link href={`/rental/${rentalData.slug.current}`}>
                        <a className="text-white rounded transition duration-150 ease-in-out bg-black px-2 py-1 border-2 border-yellow-500 hover:bg-yellow-500 ml-auto">View More</a>
                    </Link>
                    <p className="float-right font-bold lg:text-md text-lg">&#8377;{rentalData.rent}/month</p>
                </div>
            </div>
        </div>
    )
}
