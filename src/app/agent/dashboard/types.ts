import { Hostel } from "@/data/hostel";

export interface Listing extends Hostel {
  location: string;
  price: number;
  status: "Active" | "Pending";
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
    agentReply?: string;
}

export interface Activity {
    id: string;
    text: string;
    time: string;
    type: string;
}
