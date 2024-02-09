import { BUCKET_IMAGES_NAME, BUCKET_URL } from "@/app/utils/constants";
import { Button, Input } from "@nextui-org/react";
import { uploadData } from "aws-amplify/storage";
import { FC, useEffect, useState } from "react";

export const FileUploader: FC<{
    onUriChange: (uri: string) => void,
    className?: string,
    accept?: string,
    isDisabled?: boolean,
    isRequired?: boolean
    uri?: string
    bucketName?: string
}> = ({
    onUriChange,
    accept = 'image/*',
    className = '',
    isDisabled = false,
    isRequired = false,
    bucketName = BUCKET_IMAGES_NAME,
    uri
}) => {
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState('');
    const [fileUri, setFileUri] = useState('');

    useEffect(() => {
        if (uri) {
            setFileUri(uri);
        }
    }, [uri]);


    const onFileChange = (file?: File): void => {
        setFile(file);
        setFileUri('');
        setFileName(file?.name || '')
    }

    const uploadFile = async () => {
        if (!file) {
            return;
        }

        try {

        } catch (error) {
            console.error(`[FileUploader] - ${error}`)
        }
        const arrayBufferFile = await file.arrayBuffer();

        const result = await uploadData({
            key: `${bucketName}/${file.name}`,
            data: arrayBufferFile
        }).result;

        const imageUri = `${BUCKET_URL}${result.key}`;
        onUriChange(imageUri);
        setFileUri(imageUri);
    }

    const fileInputId = Date.now().toString();
    
    return (
        <>
            <Input
                isRequired={isRequired}
                type={'text'}
                variant={'bordered'}
                className={className}
                label={''}
                placeholder={fileName}
                value={fileUri || ''}
                startContent={<label className={'cursor-pointer'} htmlFor={fileInputId}>
                    <Button className={'pointer-events-none'} variant={'bordered'} size={'sm'} color={'default'}>
                        Import

                    </Button>
                    <input
                        id={fileInputId}
                        type="file"
                        accept={accept}
                        disabled={isDisabled}
                        onChange={({ target }) => {
                            if (target.files) {
                                onFileChange(target.files[0]);
                            }
                        } }
                        className={'hidden'} />
                </label>}
                endContent={<div>
                    <Button onClick={() => uploadFile()} variant={'bordered'} size={'sm'} color={'default'}>Save</Button>
                </div>}
            >
            </Input>
        </>
    );
}