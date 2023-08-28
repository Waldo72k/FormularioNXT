'use client' //Para especificar a Next que esto es usado por el cliente
import { Raleway } from 'next/font/google'
import { Lobster } from 'next/font/google'
import { parse } from 'postcss'
import { useState } from 'react'

const texto = Raleway({ subsets: ['latin'], weight: ["500"] })
const titulo = Lobster({ subsets: ['latin'], weight: ["400"]  })

export default Densidad => {

const [genero, setGenero] = useState('')
const [peso, setPeso] = useState('')
const [talla, setTalla] = useState('')
const [edad, setEdad] = useState('')
const [bicipital, setBicipital] = useState('')
const [tricipital, setTricipital] = useState('')
const [subescapular, setSubescapular] = useState('');
const [suprailiaco, setSuprailiaco] = useState('');
const [densidad, setDensidad] = useState('')
const [error, setError] = useState(false);


const handleSubmit = (e) => {
    e.preventDefault();

    if([bicipital.trim(),tricipital.trim(),subescapular.trim(),suprailiaco.trim()].includes('')){
        console.log('Favor de no dejar campos en blanco');
        setError(true);
        return
    }

    setError(false);

    if(!isNaN(bicipital) && !isNaN(tricipital) && !isNaN(subescapular) && !isNaN(suprailiaco)){
        const X1 = parseFloat(bicipital) + parseFloat(tricipital) + parseFloat(subescapular) + parseFloat(suprailiaco);
        const densidadt = (1.165 - 0.0744 * Math.log10(X1)).toFixed(4);
        setDensidad(densidadt);
    } else {
        setDensidad('Valores ingresados no validos')
    }

    

}


    return(
        <div className=" bg-[#0077B6] h-screen w-full  flex items-center justify-center">
            
            <div className=" h-[90%] w-[50%] bg-[#CAF0F8]">
                <div>
                    <h1 className={` text-center text-5xl my-7 font-black ${titulo.className}`}>Composicion corporal</h1>
                </div>
                <div className={`flex items-center justify-center ${texto.className}`}>
                    <form action=""className=' grid grid-cols-2 gap-4 '>
                        <div>
                            <label htmlFor="">Genero</label><br />
                            <input type="text" name="" id="" className=""/>
                        </div>
                            
                        <div>
                            <label htmlFor="">Peso</label><br />
                            <input type="text" name="" id="" className=""/>
                        </div>
                           
                        <div>
                            <label htmlFor="">Talla</label><br />
                            <input type="text" name="" id="" className=""/>
                        </div>

                        <div>
                            <label htmlFor="">Edad</label><br />
                            <input type="text" name="" id="" className=""/>
                        </div>

                        <div>
                            <label htmlFor="">Bicipital</label><br />
                            <input type="text" name="" id="" className=""/>
                        </div>

                        <div>
                            <label htmlFor="">Tricipital</label><br />
                            <input type="text" name="" id="" className=""/>
                        </div>
                        
                        <div className=''>
                            <label htmlFor="">Subescapular</label><br />
                            <input type="text" name="" id="" className=""/>
                        </div>

                        <div>
                            <label htmlFor="">Suprailiaco</label><br />
                            <input type="text" name="" id="" className=""/>
                        </div>
                        <div className='bg-[#0077B6] flex justify-center grid-cols-3 col-start-1 col-end-3'>
                        <input type="submit" value="Enviar" onSubmit={handleSubmit}/>
                        </div>
                    </form>
                    
                {/* <form>
                    
                    <div className=' col-start-1 col-span-2'>
                        
                    </div>
                    <div className=' col-span-1'>
                        
                    </div>
                    
                    
                    <br />
                    <label htmlFor="">Bicipital</label><br />
                    <input type="text" name="" id="" className=""/>
                    <br />
                    <label htmlFor="">Tricipital</label><br />
                    <input type="text" name="" id="" className=""/>
                    <br />
                    <label htmlFor="">Subescapular</label><br />
                    <input type="text" name="" id="" className=""/>
                    <br />
                    <label htmlFor="">Suprailiaco</label><br />
                    <input type="text" name="" id="" className=""/>
                    <br />
                    <input type="submit" value="enviar" onSubmit={handleSubmit}/>
                </form> */}
                </div>
            </div>
        </div>
    );
}