import ImageGallery from "react-image-gallery";
import Link from "next/link";

export default function HeroSection({ hero }) {
  const rentalData = hero.rental;
  const saleData = hero.sale;

  let rentalImages = [{ original: rentalData.estate.mainImage.url }],
    saleImages = [{ original: saleData.estate.mainImage.url }];
  for (let { url } of rentalData.estate.images)
    rentalImages.push({ original: url });
  for (let { url } of saleData.estate.images)
    saleImages.push({ original: url });

  return (
    <div className="w-full">
      <h3 className="text-3xl font-bold pt-8 pb-2">HOT DEALS IN RENTAL</h3>
      <div className="relative h-auto mx-auto my-5 overflow-hidden">
        <ImageGallery
          showBullets={true}
          showFullscreenButton={false}
          showPlayButton={false}
          items={rentalImages}
        />
        <div className="my-2 lg:my-0 lg:absolute w-96 h-auto top-1 left-20 z-40 py-4 px-3 space-y-4 lg:rounded-lg bg-black bg-opacity-60 text-white">
          <p className="font-bold text-3xl">{rentalData.title}</p>
          <p className="font-semibold text-xl">
            {rentalData.estate.description.children.text}
          </p>
          <p className="pb-6 border-b-2 text-xl">
            Location : {rentalData.estate.address}
          </p>
          <p className="text-yellow-500 font-bold text-3xl">
            &#8377;{rentalData.rent}/month
          </p>
          <div>
            <Link href={`/rental/${rentalData.slug.current}`}>
              <a className="rounded transition duration-150 ease-in-out bg-black p-2 border-2 border-yellow-500 hover:bg-yellow-500">
                View More
              </a>
            </Link>
          </div>
        </div>
      </div>
      <h3 className="text-3xl font-bold my-8">HOT DEALS IN SALES</h3>
      <div className="relative h-auto mx-auto my-5">
        <ImageGallery
          showFullscreenButton={false}
          showPlayButton={false}
          items={saleImages}
        />
        <div className="my-2 lg:my-0 lg:absolute lg:w-96 h-auto top-1 left-20 z-40 py-4 px-3 space-y-4 lg:rounded-lg bg-black bg-opacity-60 text-white">
          <p className="font-bold text-3xl">{saleData.title}</p>
          <p className="font-semibold text-xl">
            {saleData.estate.description.children.text}
          </p>
          <p className="pb-6 border-b-2 text-xl">
            Location : {saleData.estate.address}
          </p>
          <p className=" text-yellow-500 font-bold text-3xl">
            &#8377;{saleData.Price}
          </p>
          <div>
            <Link href={`/sale/${saleData.slug.current}`}>
              <a className="rounded transition duration-150 ease-in-out bg-black p-2 border-2 border-yellow-500 hover:bg-yellow-500">
                View More
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
