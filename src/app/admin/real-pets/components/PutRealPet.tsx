'use client';

import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { FileUploader } from "@/app/shareable/components/form/FileUploader";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { RealPet } from "../models/RealPet";
import { REAL_PETS_API } from "@/app/utils/constants";
import { useAnchor } from "@/app/shareable/providers/AnchorContextProvider";
import { PROGRAM_STATE_PDA } from "@/app/utils/pda-constants";
import { PublicKey } from "@solana/web3.js";
import { getProgramState } from "@/app/utils/get-program-state";

export interface PutRealPetProps {
    onCanceled?: () => void;
    onCreated?: () => void;
    defaultFormValue?: RealPet;
    mode: 'create' | 'update';
}

export const PutRealPet: FC<PutRealPetProps> = ({ onCanceled, onCreated, mode, defaultFormValue }) => {
    const [id, setId] = useState(v4());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [wallet, setWallet] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [uri, setUri] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { program } = useAnchor();

    useEffect(() => {
        if (!defaultFormValue) {
            return;
        }

        setId(defaultFormValue.id || v4());
        setName(defaultFormValue.name || '');
        setUri(defaultFormValue.uri || '');
        setWallet(defaultFormValue.wallet || '');
        setDescription(defaultFormValue.description || '');
        setImageUri(defaultFormValue.imageUri || '');
    }, [defaultFormValue]);

    const handleFormSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            await postItem();
            await updateProgramStateRealDog();
            toast.success(mode === 'create' ? 'RealPet has been created!' : 'RealPet has been updated!');
            setIsLoading(false);

        } catch (error) {
            toast.error('Ops! Something went wrong...');
            setIsLoading(false);
            console.log(error);
        }

        onCreated?.();
    }

    const deleteProgramStateRealDog = async () => {
        const state = await getProgramState(program);

        if (!state) {
            throw new Error('No program state');
        }

        if (!state.realDogsConfigs) {
            return;
        }

        const index = state.realDogsConfigs.findIndex((config) => config.wallet.toBase58() === wallet);
            
        if (index !== -1) {
            state.realDogsConfigs.splice(index, 1);
        }

        await program!.methods.updateProgramState(state).accounts({
            state: PROGRAM_STATE_PDA
        }).rpc();
    };

    const updateProgramStateRealDog = async () => {
        const state = await getProgramState(program);

        if (!state) {
            throw new Error('No program state');
        }

        if (!state.realDogsConfigs) {
            state.realDogsConfigs = [];
        }

        const index = state.realDogsConfigs.findIndex((config) => config.wallet.toBase58() === wallet);
            
        if (index !== -1) {
            state.realDogsConfigs[index] = {
                wallet: new PublicKey(wallet),
            };
        } else {
            state.realDogsConfigs?.push({
                wallet: new PublicKey(wallet),
            });
        }

        await program!.methods.updateProgramState(state).accounts({
            state: PROGRAM_STATE_PDA
        }).rpc();
    };

    const handleDelete = async () => {
        setIsLoading(true);

        try {
            await deleteItem();
            await deleteProgramStateRealDog();
            toast.success('RealPet has been deleted!');
            setIsLoading(false);

        } catch (error) {
            toast.error('Ops! Something went wrong...');
            setIsLoading(false);
            console.log(error);
        }

        onCreated?.();
    }

    const deleteItem = async () => {
        if (!defaultFormValue?.id) {
            console.error('No id to delete');
        }

        await fetch(REAL_PETS_API, {
            headers: {
              'x-api-key': process.env.X_API_KEY || ''
            },
            method: 'DELETE',
            body: JSON.stringify({
                id: defaultFormValue?.id
            })
          });
    }

    const postItem = async () => {
        await fetch(REAL_PETS_API, {
            headers: {
              'x-api-key': process.env.X_API_KEY || ''
            },
            method: 'POST',
            body: JSON.stringify({
                id: defaultFormValue?.id || v4(),
                name,
                description,
                wallet,
                imageUri,
                uri
            })
          });
    }

    return (
        <form onSubmit={handleFormSubmit} action="#">
            <h2 className={'mb-1 mt-2'}>Pet RealPet: </h2>
            <div className="flex py-2">
                <div className='pr-3 w-1/2'>
                    <span className={'text-sm opacity-60'}>Image</span>
                    <FileUploader 
                        isRequired={true}
                        bucketName="real-pets"
                        uri={imageUri}
                        onUriChange={setImageUri}>
                    </FileUploader>
                </div>
                <div className='pt-6 w-1/2'>
                    <Input
                        isRequired={true}
                        variant={'bordered'}
                        label={'Uri'}
                        type='url'
                        onValueChange={setUri}
                        value={uri}
                    >
                    </Input>
                </div>
            </div>
            <div className="flex py-2">
                <div className='pr-3 w-1/2'>
                    <Input
                        isRequired={true}
                        variant={'bordered'}
                        label={'Name'}
                        onValueChange={setName}
                        value={name}
                        className={'mr-4'}
                    >
                    </Input>
                </div>
                <div className='w-1/2'>
                    <Input
                        isRequired={true}
                        variant={'bordered'}
                        label={'Wallet'}
                        validationBehavior="native"
                        validate={(value) => {
                            if (!value) {
                                return 'Wallet is required';
                            }

                            if (value.length !== 44) {
                                return 'Invalid wallet';
                            }

                            return true;
                        }}
                        onValueChange={setWallet}
                        value={wallet}
                        className={'mr-4'}
                    >
                    </Input>
                </div>
            </div>
            <div className={'flex py-2'}>
                <Textarea
                    isRequired={true}
                    label={'Description'}
                    variant={'bordered'}
                    value={description}
                    onValueChange={setDescription}
                ></Textarea>
            </div>
            <div className='mt-6 flex items-center justify-end'>
                {isLoading 
                    ?  <Spinner></Spinner>
                    : <>
                        <Button type='submit' variant='solid' color='primary' className='mr-2'>
                            { mode === 'create' ? 'Create' : 'Update' }
                        </Button>
                        { mode === 'create' &&
                            <Button onClick={() => onCanceled?.()} variant='bordered' color='default' className='mr-2'>
                                Cancel
                            </Button>
                        }
                        { mode === 'update' && 
                            <Button onClick={handleDelete} variant="bordered" color='danger' className='mr-2'>
                                Delete
                            </Button>
                        }
                    </>
                }
            </div>
            
        </form>
    );
};