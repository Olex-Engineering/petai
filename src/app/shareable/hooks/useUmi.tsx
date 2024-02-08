import { useContext } from 'react';
import { UmiContext } from '@/app/shareable/providers/UmiContextProvider';

export const useUmi = () => useContext(UmiContext);