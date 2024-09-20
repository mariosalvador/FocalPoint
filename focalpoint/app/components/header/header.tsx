import logo from "@/public/focalpoint.png";
import Image from "next/image";




export const Header = ()=>{
    return (
        <header>
            <Image src={logo}  alt="Logo FocalPoint" height={40} width={150}  />

            <h2>Bem-vindo de volta, Marcus</h2>
            <span>Segunda, 01 de dezembro de 2025</span>
        </header>
    );
}
