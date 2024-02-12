import { RealPetsList } from "./components/RealPetsList";

export default function RealPetsPage() {
    return (
        <div className="max-w-screen-lg m-auto py-5">
            <div className="py-4 mb-4">
                <RealPetsList></RealPetsList>
            </div>
        </div>
    );
}