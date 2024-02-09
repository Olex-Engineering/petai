'use client';

import { FC } from "react";
import { ItemListWithCreate } from "../../shareable/ItemListWithCreate";
import { PetTemplate } from "../models/PetTemplate";
import { PET_TEMPLATES_API } from "@/app/utils/constants";
import { PutTemplate } from "./PutTemplate";
import { AccordionItem, Avatar } from "@nextui-org/react";

export interface TemplateListProps {}

export const TemplateList: FC<TemplateListProps> = () => {
    const fetchTemplates = async () => {
        const res = await fetch(PET_TEMPLATES_API, {
            headers: {
              'x-api-key': process.env.X_API_KEY || ''
            },
            method: 'GET',
          });
    
          return res.json();
    };

    return (
        <ItemListWithCreate<PetTemplate> 
            itemName='Template'
            fetchItemsFn={fetchTemplates}
            renderCreateItemFn={(onCanceled, onCreated) => (
                <PutTemplate onCanceled={onCanceled} onCreated={onCreated} mode='create'></PutTemplate>
            )}
            renderListItemFn={(value, updateList) => (
                <AccordionItem title={value.name} key={value.id} startContent={
                    <Avatar radius="lg" isBordered={true} src={value.states[1][2].imageUri} alt={'Image'} />
                }>
                    <PutTemplate defaultFormValue={value} onCreated={updateList}  mode='update'></PutTemplate>
                </AccordionItem>
            )}
        />
    );
}