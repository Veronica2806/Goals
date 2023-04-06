import type { SyntheticEvent } from "react";

export type Event = SyntheticEvent<HTMLInputElement> & {
    target: HTMLInputElement;
};

export type Goal = {
    _id: string,
    name: string,
    description: string,
    completed: boolean,
    steps: {
        _id: string,
        name: string,
        description: string,
        completed: boolean,
    }[]
}
