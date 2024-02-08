'use client';

import { useAnchor } from "@/app/shareable/providers/AnchorContextProvider";
import { PROGRAM_STATE_PDA } from "@/app/utils/pda-constants";
import { Button, Spinner } from "@nextui-org/react";
import { FC, useState } from "react";

export const Initialization: FC<{initedCb: () => void }> = ({ initedCb }) => {
    const { program } = useAnchor();
    const [isLoading, setIsLoading] = useState(false);

    const initProgram = async () => {
        setIsLoading(true);

        try {
            await program?.methods.initialize().accounts({
                state: PROGRAM_STATE_PDA,
            }).rpc();

            setIsLoading(false);
            initedCb();
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className={'mb-4'}>
                <h1>Program is not initialized!</h1>
                <span>Please click on button below</span>
            </div>
            
            {isLoading ? <Spinner></Spinner> :
                <Button onClick={initProgram} color={'primary'}>
                    Init
                </Button>
            }
        </div>
        
    )
}