export default function TrustSection() {
  return (
    <div className="w-full py-24">
      <p className="text-3xl text-center font-bold mb-6">
        Why trust NearHouse?
      </p>
      <div className="flex lg:flex-row flex-col">
        <div className="lg:w-1/3 text-center px-8">
          <img
            className="w-40 h-40 mx-auto"
            src="/svg/list.svg"
            alt="list svg"
          />
          <p className="text-lg font-bold">FIND HOUSES AT 0% COMMISSIONS</p>
          <p className="text-gray-600 text-center my-5">
            0% Commissions on rentals.Contact Our agents for free site visit .
          </p>
        </div>
        <div className="lg:w-1/3 text-center px-8">
          <img
            className="w-40 h-40 mx-auto"
            src="/svg/home.svg"
            alt="list svg"
          />
          <p className="text-lg font-bold">PROPERTY VISIT FREE OF CHARGE</p>
          <p className="text-gray-600 text-center my-5">
            Free site visits with our agents , get to know everything , then
            decide whats best for you .
          </p>
        </div>
        <div className="lg:w-1/3 text-center px-8">
          <img
            className="w-40 h-40 mx-auto"
            src="/svg/people.svg"
            alt="list svg"
          />
          <p className="text-lg font-bold">
            QUICK AGENT ASSISTANCE IN ANY LOCATION
          </p>
          <p className="text-gray-600 text-center my-5">
            Our agents are always ready to help you out . Call them any time or
            just leave us a messege we&apos;ll reply ASAP .
          </p>
        </div>
      </div>
    </div>
  );
}
