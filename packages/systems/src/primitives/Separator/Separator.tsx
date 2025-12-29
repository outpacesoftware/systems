"use client";

import { forwardRef, type HTMLAttributes } from "react";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
	/** Orientation of the separator */
	orientation?: "horizontal" | "vertical";
	/** Whether the separator is decorative (no semantic meaning) */
	decorative?: boolean;
}

/**
 * Separator - Visual divider between content
 *
 * A headless separator component for dividing content.
 *
 * @example
 * <Separator orientation="horizontal" />
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
	(props, ref) => {
		const {
			orientation = "horizontal",
			decorative = false,
			className,
			...rest
		} = props;

		return decorative ? (
			<div
				ref={ref}
				role="none"
				data-orientation={orientation}
				className={className}
				{...rest}
			/>
		) : (
			<hr
				ref={ref}
				aria-orientation={orientation}
				data-orientation={orientation}
				className={className}
				{...rest}
			/>
		);
	},
);

Separator.displayName = "Separator";
