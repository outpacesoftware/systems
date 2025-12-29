"use client";

import { createContext, type ReactNode, useContext } from "react";

export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface SelectContextValue {
	/** Currently selected value */
	value: string | undefined;
	/** Whether the select is open */
	isOpen: boolean;
	/** Whether the select is disabled */
	isDisabled: boolean;
	/** Unique ID for accessibility */
	id: string;
	/** Open the select */
	open: () => void;
	/** Close the select */
	close: () => void;
	/** Toggle open state */
	toggle: () => void;
	/** Select a value */
	selectValue: (value: string) => void;
	/** Highlighted option index */
	highlightedIndex: number;
	/** Set highlighted index */
	setHighlightedIndex: (index: number) => void;
	/** Available options */
	options: SelectOption[];
	/** Register an option */
	registerOption: (option: SelectOption) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext(): SelectContextValue {
	const context = useContext(SelectContext);
	if (!context) {
		throw new Error("Select components must be used within a Select.Root");
	}
	return context;
}

export interface SelectProviderProps {
	children: ReactNode;
	value: SelectContextValue;
}

export function SelectProvider({ children, value }: SelectProviderProps) {
	return (
		<SelectContext.Provider value={value}>{children}</SelectContext.Provider>
	);
}
