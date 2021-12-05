import firebase from "../firebase/client";
import "firebase/auth";
import Head from "next/head";
import { sanityClient } from "../sanity/sanity";
import HeroSection from "../components/HeroSection";
import RentalSection from "../components/RentalSection";
import SaleSection from "../components/SaleSection";
import TrustSection from "../components/TrustSection";
import CommentSection from "../components/CommentSection";
import ContactSection from "../components/ContactSection";

export default function Home({hero,rental,sale}) {

  return (
    <div className="background">
      <Head>
        <title>Home Page</title>
      </Head>

      <div className="w-full bg-white">
        <div className="w-11/12 lg:w-8/12 mx-auto">
          <HeroSection hero={hero} />
          <RentalSection data={rental.data} />
          <SaleSection data={sale.data} />
          <TrustSection />
        </div>
      </div>
      <div className="w-full">
        <div className="w-11/12 lg:w-8/12 mx-auto">
          <CommentSection />
        </div>
      </div>
      <div className="w-full bg-white">
        <div className="w-11/12 lg:w-8/12 mx-auto">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let query = `*[_type=="hero"][0]{
    "rental":rentalestate->{
      title,
      rent,
      slug{current},
       estate{
         address,
         description[0]{
           children[0]{
             text
           }
         },
         mainImage{
           "url":asset->url
         },
         images[]{
           "url":asset->url
         }
       } 
    },
    "sale":saleestate->{
      title,
      Price,
      slug{current},
       estate{
         address,
         description[0]{
           children[0]{
             text
           }
         },
         mainImage{
           "url":asset->url
         },
         images[]{
           "url":asset->url
         }
       } 
    }
  }`;
  const herodata = await sanityClient.fetch(query)
  query = `*[_type=="rental"][0..3]{
    title,
    rent,
    estate{
      "description":description[0]{
         children[0]{
           text
         }
       },
       mainImage{
         "url":asset->url
       },
       address,
    },
    slug{current}
  }`
  const rentalData = await sanityClient.fetch(query)
  query = `*[_type=="sale"][0..3]{
    title,
    Price,
    estate{
      "description":description[0]{
         children[0]{
           text
         }
       },
       mainImage{
         "url":asset->url
       },
       address,
    },
    slug{current}
  }`
  const saleData = await sanityClient.fetch(query)

  return {
    props: {
      hero:{
        rental: herodata.rental,
        sale: herodata.sale,
      },
      rental:{
        data:rentalData,
      },
      sale:{
        data:saleData,
      }
    },
  };
}
