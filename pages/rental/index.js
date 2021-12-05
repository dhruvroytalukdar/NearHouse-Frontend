import Head from "next/head";
import { sanityClient } from "../../sanity/sanity";
import RentalItem from "../../components/RentalItem";

export default function rental({data}) {

    return (
        <div className="w-full">
            <Head>
                <title>Rental Page</title>
            </Head>
            <div className="w-11/12 lg:w-8/12 mx-auto">
                <p className="text-center my-6 text-3xl font-bold"><span className="text-green-500">PROPERTY</span> LISTING</p>

                <div className="space-y-4 pb-4">
                    {data.map((rentalData)=><RentalItem key={rentalData.slug.current} rentalData={rentalData} />)}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const query = `*[_type=="rental"]{
        title,
        rent,
        slug{
         current
        },
        estate{
           kitchen,
           bathroom,
           bedroom,
           beds,
           keyFeatures[0..3],
           mainImage{
             "url":asset->url
           },
           images[]{
             "url":asset->url
           },
           address,
        }
      }`
    const data = await sanityClient.fetch(query)
    return {
        props:{
            data:data
        }
    }
}
