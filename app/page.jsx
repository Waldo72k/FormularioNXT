import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'], weight: ["400"] })


function Home() {
  return <div className=" bg-[#0077B6] h-screen w-full">
    <h1 className={`text-white text-center text-3xl ${raleway.className}`}>Home</h1>
  </div>
}

export default Home;