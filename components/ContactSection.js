export default function ContactSection() {
    return (
        <div className="pt-10">
            <p className="font-bold text-2xl text-center">CONTACT US</p>
            <div className="flex flex-col my-16 justify-between space-y-3 lg:text-left text-center">
                <p className="mt-2 font-semibold text-lg">Our office : 731235 | SANTINIKETAN | BIRBHUM | WEST BENGAL</p>               
                <a className="text-green-500 text-lg" href="mailto:tirtharajmukherjee@gmail.com">
                    Email: tirthrajmukherjee@gmail.com
                </a>
                <a className="text-green-500 text-lg" href="tel:+91 8918542704">
                    Tel: +91 8918542704
                </a>
                <div className="flex space-x-2 lg:justify-start justify-center">
                    <img className="w-8 h-8" src="/svg/facebook.svg" alt="facebook"/>
                    <img className="w-8 h-8" src="/svg/instagram.svg" alt="instagram"/>
                </div>
            </div>
        </div>
    )
}
