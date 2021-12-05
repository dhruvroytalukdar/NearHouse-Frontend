import { urlFor } from "../sanity/sanity"
import Link from 'next/link'

export default function RentalSection({data}) {
    return (
        <div className="w-full">
            <h3 className="text-center text-3xl font-bold py-5 border-t-2 border-b-2 border-black my-9">BEST OF RENTAL PROPERTIES</h3>
            <div className="flex lg:flex-row flex-col">
                {data.map((data) => {
                    return (
                        <div key={data.title} className="lg:p-1 lg:w-1/3 lg:px-1 lg:py-0 py-2">
                            <img src={urlFor(data.estate.mainImage.url)} alt="property image"/>
                            <p className="my-2 text-xl font-bold">{data.title}</p>
                            <p className="my-2 text-lg font-semibold">{data.estate.description.children.text}</p>
                            <p className="text-2xl font-bold text-yellow-500">&#8377;{data.rent}/month</p>
                            <p className="my-2 text-lg font-semibold">{data.estate.address}</p>
                            <div className="mt-4">
                                <Link href={`/rental/${data.slug.current}`}>
                                    <a className="text-white rounded transition duration-150 ease-in-out bg-black p-2 border-2 border-yellow-500 hover:bg-yellow-500">View More</a>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
