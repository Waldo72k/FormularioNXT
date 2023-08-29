import Link from "next/link"

const menuRoutes = [
    {
        ruta : '/',
        nombre : 'Inicio'
    },
    {
        ruta : '/about',
        nombre: 'Acerca de'
    },
    {
        ruta : '/densidad',
        nombre: 'Composicion corporal'
    }
]

export default function Menu() {
    return( 
    <div className="w-[20%] bg-primary text-white h-screen">
        <p className=" text-center text-xl">Soy el menu</p>
        <ol>
            {
                menuRoutes.map((menu,key) =>(
                    <li key={key}><Link href={menu.ruta}>{menu.nombre}</Link></li>
                ))
            }
        </ol>
    </div>
    )
}