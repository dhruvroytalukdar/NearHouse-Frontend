import { sanityClient } from "../../sanity/sanity";
import Head from "next/head";
import ImageGallery from "react-image-gallery";

export default function Property({ data }) {
  function getReviews(reviews) {
    let count = reviews.length,
      sum = 0.0;
    for (var { rating } of reviews) sum += rating;
    return sum / count;
  }

  function getImages() {
    let rentalImages = [{ original: data.estate.mainImage.url }];
    for (let { url } of data.estate.images)
      rentalImages.push({ original: url });
    return rentalImages;
  }

  function getFirstName(name) {
    return name.split(" ")[0];
  }

  function isMultiple(n) {
    return n == 1 ? "" : "s";
  }

  return (
    <div className="w-11/12 lg:w-8/12 mx-auto mb-4">
      <Head>
        <title>{data.title}</title>
      </Head>
      <div className="flex items-center">
        <div>
          <p className="text-3xl font-semibold py-4">{data.title}</p>
          <div className="flex lg:flex-row flex-col lg:space-x-2 text-gray-600 font-semibold">
            <p className="text-base">
              <img
                src="/svg/star.png"
                className="inline-block w-5 h-5 pb-1 mr-1"
              />
              {getReviews(data.estate.reviews)} rated
            </p>
            <p className="hidden lg:flex">|</p>
            <p className="text-base">
              {data.estate.reviews.length} review
              {isMultiple(data.estate.reviews.length)}
            </p>
            <p className="hidden lg:flex">|</p>
            <p className="text-base">{data.estate.address}</p>
          </div>
        </div>
        <p className="font-extrabold ml-auto text-3xl">&#8377;{data.Price}</p>
      </div>
      <div className="my-4">
        <ImageGallery items={getImages()} />
      </div>
      <div className="my-4 w-full flex items-center">
        <div className="flex flex-col">
          <p className="text-xl font-semibold">
            Entire Rental Unit Hosted By {getFirstName(data.estate.host.name)}
          </p>
          <div className="flex lg:flex-row flex-col">
            <p className="inline lg:text-sm text-md text-gray-800 lg:mr-1">
              {data.estate.bedroom} Bedroom{isMultiple(data.estate.bedroom)}
            </p>
            <p className="inline lg:text-sm text-md text-gray-800 lg:mx-1">
              {data.estate.beds} Bed{isMultiple(data.estate.beds)}
            </p>
            <p className="inline lg:text-sm text-md text-gray-800 lg:mx-1">
              {data.estate.kitchen} Kitchen{isMultiple(data.estate.kitchen)}
            </p>
            <p className="inline lg:text-sm text-md text-gray-800 lg:ml-1">
              {data.estate.bathroom} Bathroom{isMultiple(data.estate.bathroom)}
            </p>
          </div>
        </div>
        <img
          className="w-16 h-16 rounded-full ml-auto"
          src={data.estate.host.userImage}
          alt="user image"
        />
      </div>
      <div className="space-y-2 border-t-2 border-b-2 py-4">
        {data.estate.keyFeatures.map((feature) => (
          <p className="text-sm font-semibold">&#10040; {feature}</p>
        ))}
      </div>
      <div className="border-b-2 py-4">
        <p className="text-base font-medium">
          {data.estate.description.children.text}
        </p>
      </div>
      <div className="py-4">
        <p className="text-lg font-bold">
          <img src="/svg/star.png" className="inline-block w-5 h-5 pb-1 mr-1" />
          {getReviews(data.estate.reviews)} &#183; {data.estate.reviews.length}
          review{isMultiple(data.estate.reviews.length)}
        </p>
        <div className="my-4 grid gap-4 lg:grid-cols-2 grid-cols-1">
          {data.estate.reviews.map((review) => {
            return (
              <div id={review.traveller.name}>
                <div className="flex">
                  <img
                    className="w-16 h-16 rounded-full"
                    src={review.traveller.userImage}
                    alt="traveller image"
                  />
                  <div className="flex flex-col justify-center ml-2">
                    <p className="font-semibold">{review.traveller.name}</p>
                    <p className="text-sm text-gray-700">
                      {new Date(review.traveller.time).toLocaleDateString(
                        "en-US",
                        { month: "long", year: "numeric" }
                      )}
                    </p>
                  </div>
                </div>
                <p className="my-2">{review.thoughts.children.text}</p>
              </div>
            );
          })}
        </div>
      </div>
      <button className="p-4 bg-black text-white rounded-lg hover:bg-gray-300 hover:text-black">
        Contact Host
      </button>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const query = `*[_type=="sale" && slug.current=="${params.slug}"][0]{
      title,
      Price,
      estate{
        address,
        bathroom,
        bedroom,
        beds,
        kitchen,
        keyFeatures,
        "description":description[0]{
          children[0]{
            text
          }
        },
        "host":host->{
          email,
          id,
          name,
          phone,
          userImage
        },
        mainImage{
          "url":asset->url,
        },
        images[]{
          "url":asset->url,
        },
        "reviews":reviews | order(rating)[0..3]{
          rating,
          "thoughts":reviews[0]{
            children[0]{
              text
            }
          },
          traveller->{
            email,
            userImage,
            name,
            phone,
            "time":_createdAt
          }
        }
      },
      "slug":slug{
        current
      }
    }`;

  const data = await sanityClient.fetch(query);
  return { props: { data } };
}

export async function getStaticPaths() {
  const query = `*[_type=="sale"]{
        "slug":slug.current
    }`;
  const data = await sanityClient.fetch(query);
  const paths = data.map((url) => ({
    params: { slug: url.slug },
  }));

  console.log(paths);
  return { paths, fallback: false };
}
