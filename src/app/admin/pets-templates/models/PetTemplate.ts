export interface PetTemplate {
    id: string;
    name: string;
    symbol: string;
    description: string;
    states: PetTemplateStateByAge;
}

export interface PetTemplateState {
    imageUri: string;
    animationUri: string;
    splineUri: string;
}

export type PetTemplateStateByAge = [PetTemplatePossibleStates, PetTemplatePossibleStates, PetTemplatePossibleStates];
export type PetTemplatePossibleStates = [PetTemplateState, PetTemplateState, PetTemplateState];