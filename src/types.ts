
export type EventType = {
    id: number;
    name: string;
}

export type Municipality = {
    id: number;
    name: string;
    MID: number;
}

export type Event = {
    id: number;
    lat: number;
    lon: number;
    description: string | null;
    createTime: string;
    reportTime: string;
    title: string | null;
    onGoing: boolean;
    eventType: EventType;
    municipality: Municipality
}

export type LargeEvent = {
    id: number;
    description: string | null;
    createTime: string;
    municipality: Municipality
}
