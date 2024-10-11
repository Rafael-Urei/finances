export type Priority = {
	id: 'urgent' | 'high' | 'medium' | 'low' | null;
	name: string;
};

export interface Finance {
	id: number;
	method_id: number;
	created_at: string;
	status: Status;
	name: string;
	status_id: number;
	method: Method;
	priority: 'urgent' | 'high' | 'medium' | 'low' | null;
	price: string;
}

export type Method = {
	id: number;
	name: string;
	created_at: string;
};

export type Status = {
	id: number;
	name: string;
	created_at: string;
};
