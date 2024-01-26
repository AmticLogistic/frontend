import React from "react";
import JumboButton from "@jumbo/components/JumboButton/JumboButton";
import Authorized from "core/auth/Authorized";
export default function Landing(){
    return(
        <>
            <Authorized 
                noAuthorized={<> Nó estas autorizado</>}
                authorized={<> 
                    Estás autorizado
                    <div className="">
                    <span>Componente nuevo Landing prueba</span>
                    <button className="buttom-primary">button</button>
                    
                    </div>
                </>}
                
             />
            
                       
        </>
    )
}