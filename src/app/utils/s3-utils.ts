import { uploadData } from "aws-amplify/storage";
import { v4 } from "uuid";
import { MetadataFormValue } from "../admin/shareable/CreateMetadataForm";
import { BUCKET_COLLECTION_METADATA_NAME, BUCKET_URL } from "./constants";

export const uploadMetadataToAws = async (metadataValue: MetadataFormValue): Promise<string> => {
    const web2MetadataStorageObject = await uploadData({
        key: `${BUCKET_COLLECTION_METADATA_NAME}/${v4()}.json`,
        data: JSON.stringify(metadataValue)
    }).result;

    return `${BUCKET_URL}${web2MetadataStorageObject.key}`;
}