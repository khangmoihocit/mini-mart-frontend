import { createContext } from "react";

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {


    const values = {

    }
    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    );
}