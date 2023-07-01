export type Event = {
    id: number;
    lat: number;
    lon: number;
    description: string | null;
    createTime: string;
    reportTime: string;
    title: string | null;
    onGoing: boolean;
    eventType: {
        name: string;
        id: number;
    };
    municipality: {
        name: string;
        id: number;
    };
}
