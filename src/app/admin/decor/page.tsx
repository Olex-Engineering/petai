import { DecorList } from "./components/DecorList";

export default function DecorPage() {
    return (
        <div className="max-w-screen-lg m-auto py-5">
            <div className="py-4 mb-4">
                <DecorList></DecorList>
            </div>
        </div>
    );
}