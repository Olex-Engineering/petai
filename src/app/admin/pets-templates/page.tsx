import { TemplateList } from "./components/TemplatesList";

export default function PetsTemplatesPage() {

    return (
        <div className="max-w-screen-lg m-auto py-5">
            <div className="py-4 mb-4">
                <TemplateList />
            </div>
        </div>
    );
}