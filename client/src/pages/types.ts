import type { SyntheticEvent } from "react";

export type Event = SyntheticEvent<HTMLInputElement> & {
    target: HTMLInputElement;
};

export type Goal = {
    name: string,
    description: string,
    completed: boolean,
    _id: string,
    steps: {
        name: string,
        description: string,
        completed: boolean,
        _id: string
    }[]
}
