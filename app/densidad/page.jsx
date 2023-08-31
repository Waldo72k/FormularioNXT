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
    const [grasamasa, setGrasamasa] = useState('');
    const [porcentajeosea, setPorcentajeosea] = useState('');
    const [porcentajeresidual, setPorcentajeresidual] = useState('');
    const [porcentajemuscular, setPorcentajemuscular] = useState('');
    const [masamuscular, setMasamuscular] = useState('');
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
            const talla2 = parseFloat(talla) / 100;
            const femur2 = femur /100;
            const biestiloideo2 = biestiloideo /100;

            const oseaR = ((((talla2** 2) * femur2 * biestiloideo2 * 400)** 0.712)*3.02).toFixed(4);
            const mres = (peso * 0.24);
            setResidual(mres);
            console.log(oseaR);
            console.log(osea);
        } else if (genero === 'mujer' && !isNaN(bicipital) && !isNaN(tricipital) && !isNaN(subescapular) && !isNaN(supraileaco)) {
            const X1 = parseFloat(bicipital) + parseFloat(tricipital) + parseFloat(subescapular) + parseFloat(supraileaco);
            const densidadR = (1.1567 - 0.0717 * Math.log10(X1)).toFixed(4);
            setDensidad(densidadR);
            const grasa_corporalR = ((495 / densidadR) - 450).toFixed(2);
            setGrasaCorporal(grasa_corporalR);
            // console.log(grasa_corporalR);
            //conversion para sacar grasa masa
            const grasaCorpo = grasa_corporalR / 100;
            // console.log(grasaCorpo);
            const grasaM = (peso * (grasa_corporalR/100)).toFixed(4);
            // console.log(grasaM);
            setGrasamasa(grasaM);
            //const oseaR = ((((parseFloat(talla) ** 2) * femur * biestiloideo*400) ** 0.712)*3.02).toFixed(4);
            const talla2 = parseFloat(talla) / 100;
            const femur2 = femur /100;
            const biestiloideo2 = biestiloideo /100;

            const oseaR = ((((talla2** 2) * femur2 * biestiloideo2 * 400)** 0.712)*3.02).toFixed(4);
            // const oseaR2 = oseaR / 100;
            setOsea(oseaR);
            const mres = (peso * 0.21);
            setResidual(mres);
            //porcentaje de osea
            const porcentajeosea2 = ((oseaR / peso) * 100).toFixed(2);
            setPorcentajeosea(porcentajeosea2);
            // console.log(porcentajeosea2);
            //Porcentaje de Residual
            const porcentajeresidual2 = ((mres / peso) * 100).toFixed(2);
            console.log(porcentajeresidual2);
            setPorcentajeresidual(porcentajeresidual2);
            
            //Porcentaje Masa muscular
            const porcentajemuscular2 =100 - (parseFloat(grasa_corporalR) + parseFloat(porcentajeosea2) + parseFloat(porcentajeresidual2));
            // console.log(porcentajemuscular);
            setPorcentajemuscular(porcentajemuscular2);

            //Masa muscular
            const masamuscular2 = parseFloat(peso) * (porcentajemuscular2 / 100);
            console.log(masamuscular2);
            setMasamuscular(masamuscular2);

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
                <div className='flex justify-center'>
                <div className={`${titulo.className} border-2 border-terciary border-solid bg-primary text-white w-full text-center grid grid-cols-3 mt-10`}>
                    <div className=' text-xl border-2 border-terciary border-solid'>
                        <p>Componente</p>
                    </div>
                    <div className='text-xl border-2 border-terciary border-solid'>
                        <p>%</p>
                    </div>
                    <div className='text-xl border-2 border-terciary border-solid'>
                        <p>kg</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        <p>Masa Grasa</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {grasa && <p>{grasa}%</p>}
                    </div >
                    <div className='border-2 border-terciary border-solid'>
                        {grasamasa && <p>{grasamasa}</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        <p>Masa Osea</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {porcentajeosea && <p>{porcentajeosea}%</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {osea && <p>{osea}</p>}
                    </div>
                    
                    <div className='border-2 border-terciary border-solid'>
                        <p>Masa Residual</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {porcentajeresidual && <p>{porcentajeresidual}%</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {residual && <p>{residual}</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        <p>Masa Muscular</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {porcentajemuscular && <p>{porcentajemuscular}%</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {masamuscular && <p>{masamuscular}</p>}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}