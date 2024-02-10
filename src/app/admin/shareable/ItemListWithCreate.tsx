'use client';

import { Accordion, AccordionItem, Button, Spinner } from "@nextui-org/react";
import { get } from "http";
import React, { useEffect, useState } from "react";
import Icon from "react-icons-kit";
import { ic_autorenew } from 'react-icons-kit/md/ic_autorenew'

export interface ItemListWithCreateProps<T> {
    itemName: string;
    renderListItemFn: (value: T, updateList?: () => void) => React.ReactNode;
    renderCreateItemFn: (
            onCanceled: () => void,
            onCreated: () => void
        ) => React.ReactNode;
    fetchItemsFn: () => Promise<T[]>;
}

export const ItemListWithCreate = <T,>({ itemName, renderListItemFn, fetchItemsFn, renderCreateItemFn}: ItemListWithCreateProps<T>) => {
    const [isCreateEnabled, setIsCreateEnabled] = useState(false);
    const [itemList, setItemList] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        setIsLoading(true);
        const items = await fetchItemsFn();
        setItemList(items);
        setIsLoading(false);
    }

    const onCreated = () => {
        setIsCreateEnabled(false);
        getItems();
    }

    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl'>{ itemName } list</h1>
                <div className='flex items-center'>
                    <Button onClick={getItems} size="sm" isIconOnly={true} variant="bordered" className="mr-2">
                        <Icon size={14}  icon={ic_autorenew} />
                    </Button>
                    <Button
                        variant={'ghost'}
                        size='sm'
                        color={'secondary'}
                        onClick={() => setIsCreateEnabled(true)}
                        isDisabled={isCreateEnabled}
                    >
                        Create new {itemName}
                    </Button>
                </div>
                
            </div>
            {!!isLoading
                    ? <div className="py-2">
                        <Spinner></Spinner> 
                    </div>
                    : <Accordion selectionMode='multiple'>
                        {isCreateEnabled && 
                            <AccordionItem key="Create" title={'Create new'}>
                                {renderCreateItemFn(() => {}, onCreated)}
                            </AccordionItem>
                        }
                        
                        {itemList.map((item) =>  renderListItemFn(item, getItems) )}
                    </Accordion>
            }
         </div>
    );
};