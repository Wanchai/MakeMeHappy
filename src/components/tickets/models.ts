export interface TicketState {
  code: string;
  name: string;
}

export interface Ticket {
  id: string;
  created_at: Date;
  title: string;
  text: string;
  data: any;
  deleted: boolean;
  votes: number;
  user_mail: string;
  project: string;
  state: string;
  category: string;
}
