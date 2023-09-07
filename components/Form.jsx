import React, { useState } from 'react';
import { titulo, texto } from './Fonts';
import { Chart } from 'chart.js/auto';

export const Form = () => {   
    let myChart = '';
    
    const [densidad, setDensidad] = useState('');

    const [percentages, setPercentages] = useState({
        fat : '',
        bonepercent : '',
        residualpercent : '',
        muscularpercent : ''
    });

    const [weight, setWeight] = useState({
        fatmass: '',
        bones: '',
        residual: '',
        muscular: ''
    });

    const [gender, setGender] = useState('');
    const [wight, setWight] = useState('');
    const [size, setSize] = useState('');
    const [age, setAge] = useState('');
    const [bicipital, setBicipital] = useState('');
    const [tricipital, setTricipital] = useState('');
    const [subescapular, setSubescapular] = useState('');
    const [supraileaco, setSupraileaco] = useState('');
    const [femur, setFemur] = useState('');
    const [biestiloideo, setBiestiloideo] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if ([bicipital.trim(), tricipital.trim(), subescapular.trim(), supraileaco.trim()].includes('')) {
            console.log('Existen campos faltantes');
            setError(true);
            return
        }
        setError(false);

        if (gender === 'hombre' && !isNaN(bicipital) && !isNaN(tricipital) && !isNaN(subescapular) && !isNaN(supraileaco)) {
            const X1 = parseFloat(bicipital) + parseFloat(tricipital) + parseFloat(subescapular) + parseFloat(supraileaco);
            const densidadR = (1.1765 - 0.0744 * Math.log10(X1)).toFixed(4);
            setDensidad(densidadR);
            const grasa_corporalR = ((495 / densidadR) - 450).toFixed(4);
            const grasaM = (wight * (grasa_corporalR/100)).toFixed(4);
            const talla2 = parseFloat(size) / 100;
            const femur2 = femur /100;
            const biestiloideo2 = biestiloideo /100;

            const oseaR = ((((talla2** 2) * femur2 * biestiloideo2 * 400)** 0.712)*3.02).toFixed(4);
            const mres = (wight * 0.24);

            //porcentaje de osea
            const porcentajeosea2 = ((oseaR / wight) * 100).toFixed(2);
            
            //Porcentaje de Residual
            const porcentajeresidual2 = ((mres / wight) * 100).toFixed(2);
            
            //Porcentaje Masa muscular
            const porcentajemuscular2 =100 - (parseFloat(grasa_corporalR) + parseFloat(porcentajeosea2) + parseFloat(porcentajeresidual2));

            //Masa muscular
            const masamuscular2 = parseFloat(wight) * (porcentajemuscular2 / 100);

             //SetPorcentajes
             setPercentages((prevValues) => ({
                ...prevValues,
                fat : grasa_corporalR,
                bonepercent : porcentajeosea2,
                residualpercent : porcentajeresidual2,
                muscularpercent : porcentajemuscular2
            }));
            //SetPesos
            setWeight((prevValues) => ({
                ...prevValues,
                fatmass : grasaM,
                bones : oseaR,
                residual : mres,
                muscular : masamuscular2
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
        } else if (gender === 'mujer' && !isNaN(bicipital) && !isNaN(tricipital) && !isNaN(subescapular) && !isNaN(supraileaco)) {
            const X1 = parseFloat(bicipital) + parseFloat(tricipital) + parseFloat(subescapular) + parseFloat(supraileaco);
            const densidadR = (1.1567 - 0.0717 * Math.log10(X1)).toFixed(4);
            setDensidad(densidadR);
            const grasa_corporalR = ((495 / densidadR) - 450).toFixed(2);
            const grasaM = (wight * (grasa_corporalR/100)).toFixed(4);

            //Sacar Osea
            const talla2 = parseFloat(size) / 100;
            const femur2 = femur /100;
            const biestiloideo2 = biestiloideo /100;
            const oseaR = ((((talla2** 2) * femur2 * biestiloideo2 * 400)** 0.712)*3.02).toFixed(4);

            //Masa Residual
            const mres = (wight * 0.21);

            //porcentaje de osea
            const porcentajeosea2 = ((oseaR / wight) * 100).toFixed(2);

            //Porcentaje de Residual
            const porcentajeresidual2 = ((mres / wight) * 100).toFixed(2);

            //Porcentaje Masa muscular
            const porcentajemuscular2 =100 - (parseFloat(grasa_corporalR) + parseFloat(porcentajeosea2) + parseFloat(porcentajeresidual2));

            //Masa muscular
            const masamuscular2 = parseFloat(wight) * (porcentajemuscular2 / 100);

            //SetPorcentajes
            setPercentages((prevValues) => ({
                ...prevValues,
                fat : grasa_corporalR,
                bonepercent : porcentajeosea2,
                residualpercent : porcentajeresidual2,
                muscularpercent : porcentajemuscular2
            }));
            //SetPesos
            setWeight((prevValues) => ({
                ...prevValues,
                fatmass : grasaM,
                bones : oseaR,
                residual : mres,
                muscular : masamuscular2
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
                        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="w-44">
                            <option value=""></option>
                            <option value="hombre">Hombre</option>
                            <option value="mujer">Mujer</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Peso</label>
                        <input type="text" id="peso" value={wight} onChange={(e) => setWight(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Talla</label>
                        <input type="text" id="size" value={size} onChange={(e) => setSize(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 mt-5">Edad</label>
                        <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
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
                        {percentages.fat && <p>{percentages.fat}%</p>}
                    </div >
                    <div className='border-2 border-terciary border-solid'>
                        {weight.fatmass && <p>{weight.fatmass}</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        <p>Masa Osea</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {percentages.bonepercent && <p>{percentages.bonepercent}%</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {weight.bones && <p>{weight.bones}</p>}
                    </div>
                    
                    <div className='border-2 border-terciary border-solid'>
                        <p>Masa Residual</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {percentages.residualpercent && <p>{percentages.residualpercent}%</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {weight.residual && <p>{weight.residual}</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        <p>Masa Muscular</p>
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {percentages.muscularpercent && <p>{percentages.muscularpercent}%</p>}
                    </div>
                    <div className='border-2 border-terciary border-solid'>
                        {weight.muscular && <p>{weight.muscular}</p>}
                    </div>
                </div>
                </div>
            </div>
            <div className=' bg-terciary h-[45%] ml-10 rounded-lg'>
                <h1 className={`${texto.className} my-10 mb-10 text-center text-5xl text-black mt-7`}>Grafica</h1>
                <div>
                <canvas id="myChart"></canvas>
                </div>
            </div>
            </div>
    </div>
);

}