import { useContext } from 'react';
import { UmiContext } from '@/app/providers/UmiContextProvider';

export const useUmi = () => useContext(UmiContext);