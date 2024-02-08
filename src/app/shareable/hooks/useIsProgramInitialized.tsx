import { useAnchor } from "../providers/AnchorContextProvider";
import { PROGRAM_STATE_PDA } from "@/app/utils/pda-constants";

export const useIsProgramInitialized = async (): Promise<boolean> => {
    const { program } = useAnchor();

    const state = await program.account.programState.fetch(PROGRAM_STATE_PDA);
    return !!state;
}