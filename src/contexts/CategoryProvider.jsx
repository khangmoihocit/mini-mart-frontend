import categoryService from "@/apis/categoryService";
import { formatErrorMessage } from "@/utils/helpers";
import toast from "@/utils/toast";
import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext();
export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const response = await categoryService.getAllCategories();
        setCategories(response.data.result);
    }

    const deleteCategoryById = async (categoryId) => {

    }

    const createCategory = async (categoryData) => {
        try{
            const response = await categoryService.createCategory(categoryData);
        setCategories(prev => [...prev, response.data.result]);
        }catch(error){
            toast.error(formatErrorMessage(error));
        }
    }

    useEffect(()=>{
        fetchCategories();
    }, []);

    const values = {
        categories,
        setCategories,
        createCategory
    }
    return (
        <CategoryContext.Provider value={values}>
            {children}
        </CategoryContext.Provider>
    );
}