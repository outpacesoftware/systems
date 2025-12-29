"use client";

import {
	type ButtonHTMLAttributes,
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
} from "react";

// ============================================================================
// Root
// ============================================================================

export interface ToolbarRootProps extends HTMLAttributes<HTMLDivElement> {
	/** Orientation for keyboard navigation */
	orientation?: "horizontal" | "vertical";
	/** Whether navigation loops */
	loop?: boolean;
	children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, ToolbarRootProps>((props, ref) => {
	const {
		orientation = "horizontal",
		loop = true,
		children,
		className,
		...rest
	} = props;

	return (
		<div
			ref={ref}
			role="toolbar"
			aria-orientation={orientation}
			data-orientation={orientation}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

Root.displayName = "Toolbar.Root";

// ============================================================================
// Button
// ============================================================================

export interface ToolbarButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;

		return (
			<button ref={ref} type="button" className={className} {...rest}>
				{children}
			</button>
		);
	},
);

Button.displayName = "Toolbar.Button";

// ============================================================================
// Separator
// ============================================================================

export interface ToolbarSeparatorProps extends HTMLAttributes<HTMLHRElement> {}

const Separator = forwardRef<HTMLHRElement, ToolbarSeparatorProps>(
	(props, ref) => {
		const { className, ...rest } = props;

		return (
			<hr
				ref={ref}
				aria-orientation="vertical"
				className={className}
				{...rest}
			/>
		);
	},
);

Separator.displayName = "Toolbar.Separator";

// ============================================================================
// Link
// ============================================================================

export interface ToolbarLinkProps extends HTMLAttributes<HTMLAnchorElement> {
	href: string;
	children: ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, ToolbarLinkProps>((props, ref) => {
	const { href, children, className, ...rest } = props;

	return (
		<a ref={ref} href={href} className={className} {...rest}>
			{children}
		</a>
	);
});

Link.displayName = "Toolbar.Link";

// ============================================================================
// ToggleGroup
// ============================================================================

export interface ToolbarToggleGroupProps
	extends HTMLAttributes<HTMLFieldSetElement> {
	/** Single or multiple selection */
	type?: "single" | "multiple";
	children: ReactNode;
}

const ToggleGroup = forwardRef<HTMLFieldSetElement, ToolbarToggleGroupProps>(
	(props, ref) => {
		const { type = "single", children, className, ...rest } = props;

		return (
			<fieldset ref={ref} data-type={type} className={className} {...rest}>
				{children}
			</fieldset>
		);
	},
);

ToggleGroup.displayName = "Toolbar.ToggleGroup";

// ============================================================================
// ToggleItem
// ============================================================================

export interface ToolbarToggleItemProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Value for this item */
	value: string;
	children: ReactNode;
}

const ToggleItem = forwardRef<HTMLButtonElement, ToolbarToggleItemProps>(
	(props, ref) => {
		const { value, children, className, ...rest } = props;

		return (
			<button
				ref={ref}
				type="button"
				data-value={value}
				className={className}
				{...rest}
			>
				{children}
			</button>
		);
	},
);

ToggleItem.displayName = "Toolbar.ToggleItem";

// ============================================================================
// Export
// ============================================================================

export const Toolbar = {
	Root,
	Button,
	Separator,
	Link,
	ToggleGroup,
	ToggleItem,
};
