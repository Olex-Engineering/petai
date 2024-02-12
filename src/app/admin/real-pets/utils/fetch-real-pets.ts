import { REAL_PETS_API } from "@/app/utils/constants";
import { RealPet } from "../models/RealPet";

export const fetchRealPets = async (): Promise<RealPet[]> => {
    const res = await fetch(REAL_PETS_API, {
        headers: {
          'x-api-key': process.env.X_API_KEY || ''
        },
        method: 'GET',
      });

      return res.json();
};