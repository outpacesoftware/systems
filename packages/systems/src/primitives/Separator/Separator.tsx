"use client";

import { forwardRef, type HTMLAttributes, type Ref } from "react";

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
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
export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
	(props, ref) => {
		const {
			orientation = "horizontal",
			decorative = false,
			className,
			...rest
		} = props;

		if (decorative) {
			return (
				<div
					ref={ref as Ref<HTMLDivElement>}
					role="none"
					data-orientation={orientation}
					className={className}
					{...(rest as HTMLAttributes<HTMLDivElement>)}
				/>
			);
		}

		return (
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
