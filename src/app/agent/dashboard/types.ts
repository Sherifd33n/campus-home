
export interface Listing {
    id: string;
    name: string;
    location: string;
    state: string;
    schoolId: string;
    price: string;
    status: string;
    about: string;
    gender: string;
    distanceToCampus: string;
    amenities: string[];
    images: string[];
    rooms: {
        type: string;
        price: string;
        availability: string;
    }[];
    policies: {
        utilitiesIncluded: boolean;
        refundableDeposit: boolean;
        noHiddenFees: boolean;
    };
}

export interface Lead {
    id: string;
    studentName: string;
    property: string;
    message: string;
    email: string;
    phone: string;
    date: string;
    status: "new" | "contacted" | "archived";
}

export interface Activity {
    id: string;
    text: string;
    time: string;
    type: string;
}
