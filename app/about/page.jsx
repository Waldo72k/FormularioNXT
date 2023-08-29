import { Raleway } from 'next/font/google'
import { Lobster } from 'next/font/google'
import Image from 'next/image'
import img from './images/water.jpg'

// import Water from '../about/images/water.jpg'

const texto = Raleway({ subsets: ['latin'], weight: ["500"] })
const titulo = Lobster({ subsets: ['latin'], weight: ["400"]  })

export default About => {
    return(
    <div className=" bg-secondary h-screen w-full  flex items-center justify-center">

        {/* <h1 className={`text-white text-center text-3xl my-7 ${raleway.className}`}>Acerca de</h1> */}

        <div className=" h-[90%] w-[95%] bg-terciary">
            <h1 className={` text-center text-5xl my-7 font-black ${titulo.className}`}>
                Acerca de
            </h1>
            <div className="flex">
            <div className={` text-lg ml-10 mr-5 py-7 ${texto.className}`}>
            <p className="py-3">
            En Moistened, nos enorgullecemos de ser líderes en la industria de soluciones de riego. Desde nuestros inicios, hemos estado comprometidos en brindar servicios y productos de alta calidad para satisfacer las necesidades de nuestros clientes en el ámbito de la irrigación.
            </p>
            <p className="py-3">
            Nuestra empresa se ha destacado por su experiencia en diseñar, instalar y mantener sistemas de riego eficientes y sostenibles. Trabajamos con agricultores, paisajistas y propietarios de terrenos para asegurarnos de que obtengan el máximo rendimiento y conserven recursos vitales como el agua.
            </p>
            <p className="py-3">
            Lo que nos diferencia es nuestro equipo de profesionales altamente capacitados y apasionados por el riego. Combinamos conocimientos técnicos con tecnología de vanguardia para ofrecer soluciones personalizadas que optimizan el uso del agua y mejoran los resultados.Lo que nos diferencia es nuestro equipo de profesionales altamente capacitados y apasionados por el riego. Combinamos conocimientos técnicos con tecnología de vanguardia para ofrecer soluciones personalizadas que optimizan el uso del agua y mejoran los resultados.
            </p>
            <p className="py-3">
            En Moistened, nuestro compromiso con la excelencia y la innovación nos impulsa a seguir siendo líderes en la industria. Estamos dedicados a hacer que la irrigación sea más eficiente, rentable y amigable con el medio ambiente.
            </p>
            <p className="py-3 font-black">
            Confía en nosotros para tu próxima solución de riego. ¡Estamos aquí para hacer que tu proyecto de riego sea un éxito!
            </p>
            </div>
            <div className=" mx-5">
            <Image
             src={img}
             alt={"imagen"}
             className=" rounded-lg"
             width="3000"
            />
            </div>
            </div>
        </div>
    </div>
    )
}