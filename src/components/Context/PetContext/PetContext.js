import { createContext, useContext, useState } from "react"

const PetContext = createContext()

export const usePetContext = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
    const [lovePet, setLovePet] = useState([]);

    const handleWishlist = (pet) => {
        if (pet && pet.petId) {
            setLovePet((prev) => ({ ...prev, [pet.petId]: !prev[pet.petId] }));
        }
    };

    return (
        <PetContext.Provider value={{ lovePet, handleWishlist }}>
            {children}
        </PetContext.Provider>
    );
};