import { AssetList } from "./components/AssetList";

export default function AssetPage() {
    return (
        <div className="max-w-screen-lg m-auto py-5">
            <div className="py-4 mb-4">
                <AssetList></AssetList>
            </div>
        </div>
    );
}