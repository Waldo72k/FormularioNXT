import React, { useState } from 'react';
import { titulo, texto } from './Fonts';
import { Chart } from 'chart.js/auto';

export const Form = () => {   
    let myChart = null;
    
    const [densidad, setDensidad] = useState(null);

    const [percentages, setPercentages] = useState({
        grasa : null,
        porcentajeosea : null,
        porcentajeresidual : null,
        porcentajemuscular : null
    });

    const [weight, setWeight] = useState({
        grasamasa: null,
        osea: null,
        residual: null,
        masamuscular: null
    });

    const [datas, setDatas] = useState({
        genero: null,
        peso: null,
        talla: null,
        edad: null,
        bicipital: null,
        tricipital: null,
        subescapular: null,
        supraileaco: null,
        femur: null,
        biestiloideo: null
    })

    const [genero, setGenero] = useState(null);
    const [peso, setPeso] = useState(null);
    const [talla, setTalla] = useState(null);
    const [edad, setEdad] = useState(null);
    const [bicipital, setBicipital] = useState(null);
    const [tricipital, setTricipital] = useState(null);
    const [subescapular, setSubescapular] = useState(null);
    const [supraileaco, setSupraileaco] = useState(null);
    const [femur, setFemur] = useState(null);
    const [biestiloideo, setBiestiloideo] = useState(null);
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
            const grasaM = (peso * (grasa_corporalR/100)).toFixed(4);
            const talla2 = parseFloat(talla) / 100;
            const femur2 = femur /100;
            const biestiloideo2 = biestiloideo /100;

            const oseaR = ((((talla2** 2) * femur2 * biestiloideo2 * 400)** 0.712)*3.02).toFixed(4);
            const mres = (peso * 0.24);

            //porcentaje de osea
            const porcentajeosea2 = ((oseaR / peso) * 100).toFixed(2);
            
            //Porcentaje de Residual
            const porcentajeresidual2 = ((mres / peso) * 100).toFixed(2);
            
            //Porcentaje Masa muscular
            const porcentajemuscular2 =100 - (parseFloat(grasa_corporalR) + parseFloat(porcentajeosea2) + parseFloat(porcentajeresidual2));

            //Masa muscular
            const masamuscular2 = parseFloat(peso) * (porcentajemuscular2 / 100);

             //SetPorcentajes
             setPercentages((prevValues) => ({
                ...prevValues,
                grasa : grasa_corporalR,
                porcentajeosea : porcentajeosea2,
                porcentajeresidual : porcentajeresidual2,
                porcentajemuscular : porcentajemuscular2
            }));
            //SetPesos
            setWeight((prevValues) => ({
                ...prevValues,
                grasamasa : grasaM,
                osea : oseaR,
                residual : mres,
                masamuscular : masamuscular2
            }));

            //Lo que me crea la chart
            (async function() {
                const data = [
                  { label: "Masa Grasa", value: grasa_corporalR },
                  { label: "Masa Osea", value: porcentajeosea2 },
                  { label: "Masa Residual", value: porcentajeresidual2 },
                  { label: "Masa Muscular", value: porcentajemuscular2 }
                ];
                new Chart(
                  document.getElementById('myChart'),
                  {
                    type: 'doughnut',
                    data: {
                      labels: data.map(row => row.label),
                      datasets: [
                        {
                          label: 'Acquisitions by year',
                          data: data.map(row => row.value)
                        }
                      ]
                    }
                  }
                );
              })();
        } else if (genero === 'mujer' && !isNaN(bicipital) && !isNaN(tricipital) && !isNaN(subescapular) && !isNaN(supraileaco)) {
            const X1 = parseFloat(bicipital) + parseFloat(tricipital) + parseFloat(subescapular) + parseFloat(supraileaco);
            const densidadR = (1.1567 - 0.0717 * Math.log10(X1)).toFixed(4);
            setDensidad(densidadR);
            const grasa_corporalR = ((495 / densidadR) - 450).toFixed(2);
            const grasaM = (peso * (grasa_corporalR/100)).toFixed(4);

            //Sacar Osea
            const talla2 = parseFloat(talla) / 100;
            const femur2 = femur /100;
            const biestiloideo2 = biestiloideo /100;
            const oseaR = ((((talla2** 2) * femur2 * biestiloideo2 * 400)** 0.712)*3.02).toFixed(4);

            //Masa Residual
            const mres = (peso * 0.21);

            //porcentaje de osea
            const porcentajeosea2 = ((oseaR / peso) * 100).toFixed(2);

            //Porcentaje de Residual
            const porcentajeresidual2 = ((mres / peso) * 100).toFixed(2);

            //Porcentaje Masa muscular
            const porcentajemuscular2 =100 - (parseFloat(grasa_corporalR) + parseFloat(porcentajeosea2) + parseFloat(porcentajeresidual2));

            //Masa muscular
            const masamuscular2 = parseFloat(peso) * (porcentajemuscular2 / 100);

            //SetPorcentajes
            setPercentages((prevValues) => ({
                ...prevValues,
                grasa : grasa_corporalR,
                porcentajeosea : porcentajeosea2,
                porcentajeresidual : porcentajeresidual2,
                porcentajemuscular : porcentajemuscular2
            }));
            //SetPesos
            setWeight((prevValues) => ({
                ...prevValues,
                grasamasa : grasaM,
                osea : oseaR,
                residual : mres,
                masamuscular : masamuscular2
            }));

            
            //Lo que me crea la chart
            (async function() {
                const data = [
                  { label: "Masa Grasa", value: grasa_corporalR },
                  { label: "Masa Osea", value: porcentajeosea2 },
                  { label: "Masa Residual", value: porcentajeresidual2 },
                  { label: "Masa Muscular", value: porcentajemuscular2 }
                ];
                
                new Chart(
                  document.getElementById('myChart'),
                  {
                    type: 'doughnut',
                    data: {
                      labels: data.map(row => row.label),
                      datasets: [
                        {
                          label: 'Acquisitions by year',
                          data: data.map(row => row.value)
                        }
                      ]
                    }
                  }
                );
              })();

        }
        else {
            setDensidad("Valores ingresados no validos.");
        }

        
    };
    
return(
    <div>
        <div className={`${titulo.className} flex justify-center p-[20px] w-full bg-secondary`}>
        <div className=' items-center w-[50%] justify-center bg-terciary rounded-lg'>
                <h1 className={`${texto.className}  text-center text-5xl text-black mt-7`}>Composicion Corporal</h1>
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
                        {percentages.grasa && <p>{percentages.grasa}%</p>}
                    </div >
                    <div className='border-2 border-terciary border-solid'>
                        {weight.grasamasa && <p>{weight.grasamasa}</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        <p>Masa Osea</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {percentages.porcentajeosea && <p>{percentages.porcentajeosea}%</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {weight.osea && <p>{weight.osea}</p>}
                    </div>
                    
                    <div className='border-2 border-terciary border-solid'>
                        <p>Masa Residual</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {percentages.porcentajeresidual && <p>{percentages.porcentajeresidual}%</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {weight.residual && <p>{weight.residual}</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        <p>Masa Muscular</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {percentages.porcentajemuscular && <p>{percentages.porcentajemuscular}%</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {weight.masamuscular && <p>{weight.masamuscular}</p>}
                    </div>
                </div>
                </div>
            </div>
            <div className=' bg-terciary h-[45%]'>
                <h1 className={`${texto.className} my-10 mb-10 text-center text-5xl text-black mt-7`}>Tabla</h1>
                <div>
                <canvas id="myChart"></canvas>
                </div>
            </div>
            </div>
    </div>
);

}