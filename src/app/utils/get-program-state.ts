import { Program } from "@coral-xyz/anchor";
import { Petai } from "../types/petai";
import { PROGRAM_STATE_PDA } from "./pda-constants";

export const getProgramState = async (program?: Program<Petai> | null) => {
    if (!program) {
        throw new Error('Program not initialized');
    }

    return program.account.programState.fetch(PROGRAM_STATE_PDA);
};