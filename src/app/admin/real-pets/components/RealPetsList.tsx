'use client';

import { ItemListWithCreate } from "../../shareable/ItemListWithCreate";
import { RealPet } from "../models/RealPet";
import { PutRealPet } from "./PutRealPet";
import { AccordionItem, Avatar } from "@nextui-org/react";
import { fetchRealPets } from "../utils/fetch-real-pets";

export const RealPetsList = () => {
    const fetchTemplates = async () => {
        return fetchRealPets();
    };

    return (
        <ItemListWithCreate<RealPet> 
            itemName='Real Pet'
            fetchItemsFn={fetchTemplates}
            renderCreateItemFn={(onCanceled, onCreated) => (
                <PutRealPet onCanceled={onCanceled} onCreated={onCreated} mode='create'></PutRealPet>
            )}
            renderListItemFn={(value, updateList) => (
                <AccordionItem title={value.name} key={value.id} startContent={
                    <Avatar radius="lg" isBordered={true} src={value.imageUri} alt={'Image'} />
                }>
                    <PutRealPet defaultFormValue={value} onCreated={updateList}  mode='update'></PutRealPet>
                </AccordionItem>
            )}
        />
    );
};