'use client';

import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { PetTemplate, PetTemplateState } from "../models/PetTemplate";
import { FileUploader } from "@/app/shareable/components/form/FileUploader";
import { BUCKET_PET_TEMPLATES_NAME, DEFAULT_METADATA_SYMBOL, PET_TEMPLATES_API } from "@/app/utils/constants";
import { toast } from "react-toastify";
import { v4 } from "uuid";

export interface PutTemplateProps {
    onCanceled?: () => void;
    onCreated?: () => void;
    defaultFormValue?: PetTemplate;
    mode: 'create' | 'update';
}

const defaultStateValue: PetTemplateState = {
    imageUri: '',
    animationUri: '',
    splineUri: ''
}

const defaultStatesValue = Array(3).fill(0).map(() => Array(3).fill({ ...defaultStateValue }));

const PET_AGE_BY_INDEX = ['Puppy', 'Adult', 'Senior'];
const PET_STATE_BY_INDEX = ['Sad', 'Angry', 'Happy'];

export const PutTemplate: FC<PutTemplateProps> = ({ onCanceled, onCreated, mode, defaultFormValue }) => {
    const [symbol, setSymbol] = useState(DEFAULT_METADATA_SYMBOL);
    const [id, setId] = useState(v4());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [states, setStates] = useState(defaultStatesValue);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!defaultFormValue) {
            return;
        }

        setId(defaultFormValue.id || v4());
        setName(defaultFormValue.name || '');
        setSymbol(defaultFormValue.symbol || DEFAULT_METADATA_SYMBOL);
        setDescription(defaultFormValue.description || '');
        setStates(defaultFormValue.states || defaultStatesValue);
    }, [defaultFormValue]);

    const handleFormSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            await postItem();
            toast.success(mode === 'create' ? 'Template has been created!' : 'Template has been updated!');
            setIsLoading(false);

        } catch (error) {
            toast.error('Ops! Something went wrong...');
            setIsLoading(false);
            console.log(error);
        }

        onCreated?.();
    }

    const handleDelete = async () => {
        setIsLoading(true);

        try {
            await deleteItem();
            toast.success('Template has been deleted!');
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

        await fetch(PET_TEMPLATES_API, {
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
        await fetch(PET_TEMPLATES_API, {
            headers: {
              'x-api-key': process.env.X_API_KEY || ''
            },
            method: 'POST',
            body: JSON.stringify({
                id: defaultFormValue?.id || v4(),
                name,
                symbol,
                description,
                states,
            })
          });
    }

    const handleStateChange = (ageIndex: number, stateIndex: number, prop: keyof PetTemplateState, value: string) => {
        const copiedStates = [...states];
        const copiedState = { ...copiedStates[ageIndex][stateIndex] };
        copiedState[prop] = value;
        copiedStates[ageIndex][stateIndex] = copiedState;

        setStates(copiedStates);
    }

    return (
        <form onSubmit={handleFormSubmit} action="#">
            <h2 className={'mb-1 mt-2'}>Pet template: </h2>
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
                        label={'Symbol'}
                        onValueChange={setSymbol}
                        value={symbol}
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
            <div className='py-2'>
                <h3 className='text-lg'>Pet states assets:</h3>
                { states.map((state, ageIndex) => (
                    <div key={ageIndex} className='py-2'>
                        <h4 className='text-base opacity-90'>{PET_AGE_BY_INDEX[ageIndex]}</h4>
                        <div className='p-2 border border-solid rounded-xl mt-2'>
                            { state.map((petState: PetTemplateState, stateIndex: number) => (
                                <div className='py-2' key={stateIndex}>
                                    <h5 className='text-sm opacity-85'>{PET_STATE_BY_INDEX[stateIndex]}</h5>
                                    <div className='flex py-2'>
                                        <div className='mr-2'>
                                            <span className={'text-sm'}><span className={'opacity-60'}>Image</span> <span className={'text-red-500'}>*</span></span>
                                            <FileUploader
                                                onUriChange={(val) => handleStateChange(ageIndex, stateIndex, 'imageUri', val)}
                                                isRequired={true}
                                                uri={petState.imageUri}
                                                bucketName={BUCKET_PET_TEMPLATES_NAME}
                                            ></FileUploader>
                                        </div>
                                        <div className='mr-2'>
                                            <span className={'text-sm'}><span className={'opacity-60'}>Animation</span></span>
                                            <FileUploader
                                                onUriChange={(val) => handleStateChange(ageIndex, stateIndex, 'animationUri', val)}
                                                uri={petState.animationUri}
                                                bucketName={BUCKET_PET_TEMPLATES_NAME}
                                            ></FileUploader>
                                        </div>
                                        <div>
                                            <span className={'text-sm'}><span className={'opacity-60'}>Spine file uri</span> <span className={'text-red-500'}>*</span></span>
                                            <FileUploader
                                                onUriChange={(val) => handleStateChange(ageIndex, stateIndex, 'splineUri', val)}
                                                isRequired={true}
                                                uri={petState.splineUri}
                                                bucketName={BUCKET_PET_TEMPLATES_NAME}
                                            ></FileUploader>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
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