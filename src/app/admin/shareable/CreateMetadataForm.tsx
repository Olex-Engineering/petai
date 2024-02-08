'use client';

import { FileUploader } from "@/app/shareable/components/form/FileUploader";
import { DEFAULT_METADATA_SYMBOL } from "@/app/utils/constants";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";

export interface MetadataFormValue {
    name: string;
    imageUrl: string;
    animationUrl: string;
    externalUrl: string;
    description: string;
    symbol: string;
    attributes: MetadataAttribute[];
    properties: MetadataProperties;
}

export interface MetadataAttribute {
    id?: string;
    trait_type: string;
    value: string;
    isCanBeDeleted?: boolean;
    isNameCanBeChanged?: boolean;
}

export interface MetadataProperties {
    files: MetadataFile[],
    category: string
}

export interface MetadataFile {
    id?: string;
    uri: string;
    type: string;
    cdn?: boolean;
}

interface CreateMetadataFormProps {
    onChange: (formValue: MetadataFormValue) => void;
    defaultValue?: Partial<MetadataFormValue>;
}

export const CreateMetadataForm: FC<CreateMetadataFormProps> = ({ defaultValue, onChange }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [externalUrl, setExternalUrl] = useState(window.location.origin);
    const [symbol, setSymbol] = useState(DEFAULT_METADATA_SYMBOL);
    const [propertiesCategory, setPropertiesCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [animationUrl, setAnimationUrl] = useState('');
    const [files, setFiles] = useState<MetadataFile[]>([]);
    const [attributes, setAttributes] = useState<MetadataAttribute[]>([]);


    useEffect(() => {
        onChange({
            name,
            imageUrl,
            animationUrl,
            externalUrl,
            description,
            symbol,
            attributes: attributes.map((attribute) => ({
                trait_type: attribute.trait_type,
                value: attribute.value
            })),
            properties: {
                category: propertiesCategory,
                files: files.map((file) => ({
                    uri: file.uri,
                    type: file.type
                }))
            }
        });
    }, [name, imageUrl, description, symbol, attributes, animationUrl, externalUrl, files, propertiesCategory, onChange]);

    useEffect(() => {
        console.log(defaultValue?.attributes);
        if (defaultValue) {
            setName(defaultValue.name || name);
            setDescription(defaultValue.description || description);
            setExternalUrl(defaultValue.externalUrl || externalUrl);
            setSymbol(defaultValue.symbol || symbol);
            setImageUrl(defaultValue.imageUrl || imageUrl);
            setAnimationUrl(defaultValue.animationUrl || animationUrl);
            setFiles(defaultValue.properties?.files ? [...defaultValue.properties.files] : files);
            setAttributes(defaultValue.attributes ? [...defaultValue.attributes] : attributes);
            setPropertiesCategory(defaultValue.properties?.category || propertiesCategory);
        }
    }, [defaultValue]);

    const addAttribute = () => {
        setAttributes([...attributes, {
            id: Date.now().toString(),
            trait_type: '',
            value: '',
            isCanBeDeleted: true,
            isNameCanBeChanged: true
        }])
    }

    const removeAttribute = (index: number) => {
        const copyAttributes = [...attributes];
        copyAttributes.splice(index, 1);
        setAttributes(copyAttributes);
    }

    const setAttributeProperty = (index: number, key: keyof MetadataAttribute, value: string) => {
        attributes[index][key] = value as never;
        setAttributes([...attributes]);
    }

    const addFile = () => {
        setFiles([...files, {
            id: Date.now().toString(),
            type: '',
            uri: ''
        }])
    }

    const removeFile = (index: number) => {
        const copyFiles = [...files];
        copyFiles.splice(index, 1);
        setFiles(copyFiles);
    }

    const setFileProperty = (index: number, key: keyof MetadataFile, value: unknown) => {
        (files[index][key] as unknown) = value;
        setFiles([...files]);
    }

    return (
        <div>
        <h2 className={'mb-1 mt-2'}>Metadata: </h2>
          <div className="flex py-2">
            <div className={'w-2/4 pr-3'}>
                <Input
                    isRequired={true}
                    variant={'bordered'}
                    label={'External url (our site)'}
                    value={externalUrl}
                    onValueChange={setExternalUrl}
                    >
                </Input>
            </div>
          </div>

          <div className="flex py-2">
            <Input
              isRequired={true}
              variant={'bordered'}
              label={'Name'}
              onValueChange={setName}
              value={name}
              className={'mr-4'}
            >
            </Input>
            <Input
                isRequired={true}
                label={'Symbol'}
                variant={'bordered'}
                value={symbol}
                onValueChange={setSymbol}
                className={'mr-2'}
            >
            </Input>
          </div>
          <div className={'flex py-2'}>
            <Textarea
              isRequired={true}
              label={'Description'}
              variant={'bordered'}
              value={description}
              onValueChange={setDescription}
              className={'mr-2'}
            ></Textarea>
          </div>
          <h2 className={'mb-1 mt-6'}>Image and animation uploaders: </h2>
          <div className={'flex items-center justify-start py-2'}>
            <div className={'w-2/4 mr-4'}>
                <span className={'text-sm'}><span className={'opacity-60'}>Image</span> <span className={'text-red-500'}>*</span></span>
                <FileUploader uri={imageUrl} isRequired={true} onUriChange={setImageUrl}></FileUploader>
            </div>
            <div className={'w-2/4'}>
                <span className={'text-sm opacity-60'}>Animation (gif) </span>
                <FileUploader uri={animationUrl} onUriChange={setAnimationUrl}></FileUploader>
            </div>
          </div>
          <h2 className={'mt-6'}>Attributes:</h2>
          {attributes.map((attribute, index) => (
            <div className={'flex items-center py-2'} key={attribute.id}>
                <Input
                    isRequired={true}
                    variant={'bordered'}
                    label={'Name' + (!attribute.isNameCanBeChanged ? ' (read only)' : '')}
                    value={attribute.trait_type}
                    onValueChange={(value) => setAttributeProperty(index, 'trait_type', value)}
                    className={'mr-2'}
                    isReadOnly={!attribute.isNameCanBeChanged}
                >
                </Input>
                <Input
                    isRequired={true}
                    variant={'bordered'}
                    label={'Value'}
                    value={attribute.value}
                    onValueChange={(value) => setAttributeProperty(index, 'value', value)}
                    className={'mr-2'}
                >
                </Input>
                <Button 
                    onClick={() => removeAttribute(index)}
                    variant={'bordered'}
                    size={'sm'}
                    isDisabled={!attribute.isCanBeDeleted}
                    color={'default'}>
                        Remove
                </Button>
            </div>
          ))}
          <Button onClick={addAttribute} className={'mt-2'} variant={'bordered'} color={'secondary'} size={'sm'}>Add attribute</Button>
          <h2 className={'mt-6'}>Files:</h2>
          {!!files.length && (
            <Select
                isRequired={true}
                variant={'bordered'}
                label={'Properties category'}
                value={propertiesCategory}
                onChange={({target}) => setPropertiesCategory(target.value)}
                className={'mb-4 mt-2 pr-10 w-2/4'}
            >
                {['image', 'video'].map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
            </Select>
          )}
          {files.map((file, index) => (
            <div className={'flex items-center py-2'} key={file.id}>
                <Select
                    isRequired={true}
                    variant={'bordered'}
                    label={'Type'}
                    value={file.type}
                    onChange={({target}) => setFileProperty(index, 'type', target.value)}
                    className={'mr-2'}
                >
                    {['image/png', 'image/jpg', 'image/gif', 'video/mp4', 'image/webp'].map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                </Select>
                <FileUploader
                    isRequired={true}
                    className={'mr-2'}
                    uri={file.uri}
                    accept={files[index].type}
                    isDisabled={!files[index].type}
                    onUriChange={(value) => setFileProperty(index, 'uri', value)}
                >
                </FileUploader>
                <Button onClick={() => removeFile(index)} variant={'bordered'} size={'sm'} color={'default'}>Remove</Button>
            </div>
          ))}
          <Button onClick={addFile} className={'mt-2'} variant={'bordered'} color={'secondary'} size={'sm'}>Add file</Button>
        </div>
    );
}