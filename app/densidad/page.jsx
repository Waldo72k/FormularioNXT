'use client'

import { Raleway } from 'next/font/google'
import { Lobster } from 'next/font/google'
import { useState } from "react"

const texto = Lobster({ subsets: ['latin'], weight: '400' })
const titulo = Raleway({ subsets: ['latin'], weight: "400" })

export default function Densidad() {

    const [genero, setGenero] = useState('');
    const [peso, setPeso] = useState('');
    const [talla, setTalla] = useState('');
    const [edad, setEdad] = useState('');
    const [bicipital, setBicipital] = useState('');
    const [tricipital, setTricipital] = useState('');
    const [subescapular, setSubescapular] = useState('');
    const [supraileaco, setSupraileaco] = useState('');
    const [densidad, setDensidad] = useState('');
    const [grasa, setGrasaCorporal] = useState('');
    const [femur, setFemur] = useState('');
    const [biestiloideo, setBiestiloideo] = useState('');
    const [osea, setOsea] = useState('');
    const [residual, setResidual] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if ([bicipital.trim(), tricipital.trim(), subescapular.trim(), supraileaco.trim()].includes('')) {
            console.log('Existen campos faltantes');
            setError(true);
            return
        }
        setError(false);

        if (genero === 'hombre' && !isNaN(bicipital) && !isNaN(tricipital) && !isNaN(subescapular) && !isNaN(supraileaco)) {
            const X1 = parseFloat(bicipital) + parseFloat(tricipital) + parseFloat(subescapular) + parseFloat(supraileaco);
            const densidadR = (1.1765 - 0.0744 * Math.log10(X1)).toFixed(4);
            setDensidad(densidadR);
            const grasa_corporalR = ((495 / densidadR) - 450).toFixed(4);
            setGrasaCorporal(grasa_corporalR);
            const oseaR = ((((parseFloat(talla) ** 2)*(femur)*(biestiloideo)*400)**0.712)*3.02).toFixed(4);
            setOsea(oseaR);
            const mres = (peso * 0.24);
            setResidual(mres);
            console.log(oseaR);
            console.log(osea);
        } else if (genero === 'mujer' && !isNaN(bicipital) && !isNaN(tricipital) && !isNaN(subescapular) && !isNaN(supraileaco)) {
            const X1 = parseFloat(bicipital) + parseFloat(tricipital) + parseFloat(subescapular) + parseFloat(supraileaco);
            const densidadR = (1.1567 - 0.0717 * Math.log10(X1)).toFixed(4);
            setDensidad(densidadR);
            const grasa_corporalR = ((495 / densidadR) - 450).toFixed(4);
            setGrasaCorporal(grasa_corporalR);
            const oseaR = ((((parseFloat(talla) ** 2)*(femur)*(biestiloideo)*400)**0.712)*3.02).toFixed(4);
            setOsea(oseaR);
            const mres = (peso * 0.21);
            setResidual(mres);
        }
        else {
            setDensidad("Valores ingresados no validos.");
        }
    };

    return (
        <div className={`${titulo.className} flex justify-center p-[20px] w-full bg-secondary`}>
            <div className=' items-center w-[50%] justify-center bg-terciary rounded-lg'>
                <h1 className={`${texto.className} my-10 mb-10 text-center text-5xl text-black mt-10`}>Composicion Corporal</h1>
                <form onSubmit={handleSubmit} className={`${titulo.className} text-center grid grid-cols-2 gap-4`}>

                    <div>
                        <label className="text-black block mb-2 mt-5">Genero</label>
                        <select id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} className="w-44">
                            <option value=""></option>
                            <option value="hombre">Hombre</option>
                            <option value="mujer">Mujer</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Peso</label>
                        <input type="text" id="peso" value={peso} onChange={(e) => setPeso(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Talla</label>
                        <input type="text" id="talla" value={talla} onChange={(e) => setTalla(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Edad</label>
                        <input type="text" id="edad" value={edad} onChange={(e) => setEdad(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Bicipital</label>
                        <input type="text" id="bicipital" value={bicipital} onChange={(e) => setBicipital(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Tricipital</label>
                        <input type="text" id="tricipital" value={tricipital} onChange={(e) => setTricipital(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Subescapular</label>
                        <input type="text" id="subescapular" value={subescapular} onChange={(e) => setSubescapular(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Supraileaco</label>
                        <input type="text" id="supraileaco" value={supraileaco} onChange={(e) => setSupraileaco(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Femur</label>
                        <input type="text" id="supraileaco" value={femur} onChange={(e) => setFemur(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Biestiloideo</label>
                        <input type="text" id="supraileaco" value={biestiloideo} onChange={(e) => setBiestiloideo(e.target.value)} />
                    </div>
                    <input value="Enviar" type="submit" className=" w-80 mt-32 rounded-md p-2 uppercase bg-primary border-primary hover:bg-white cursor-pointer text-white hover:text-black ml-56" />
                </form>
                <div className={`${titulo.className} w-full text-center bg-terciary`}>
                    <div className='mt-10'>
                        {densidad && <p>Densidad: {densidad} mm</p>}
                    </div>
                    <div>
                        {grasa && <p>Grasa Corporal: {grasa}%</p>}
                    </div>
                    <div>
                        {osea && <p>Masa Osea: {osea}kg</p>}
                    </div>
                    <div>
                        {residual && <p>Masa Residual: {residual}kg</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}