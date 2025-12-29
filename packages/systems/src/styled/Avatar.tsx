"use client";

import { forwardRef, type HTMLAttributes, useState } from "react";

// ============================================================================
// Types
// ============================================================================

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
	/** Image source */
	src?: string;
	/** Alt text */
	alt?: string;
	/** Fallback text (initials) */
	fallback?: string;
	/** Size variant */
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	/** Shape variant */
	shape?: "circle" | "square";
}

// ============================================================================
// Styles
// ============================================================================

const sizeStyles = {
	xs: "size-6 text-[10px] leading-[13px]",
	sm: "size-8 text-[10px] leading-[13px]",
	md: "size-10 text-[12px] leading-[15px]",
	lg: "size-12 text-[13px] leading-4",
	xl: "size-16 text-[15px] leading-5",
};

const shapeStyles = {
	circle: "rounded-full",
	square: "rounded-lg",
};

// ============================================================================
// Component
// ============================================================================

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
	(
		{
			src,
			alt = "",
			fallback,
			size = "md",
			shape = "circle",
			className = "",
			...props
		},
		ref,
	) => {
		const [imageError, setImageError] = useState(false);
		const showImage = src && !imageError;

		// Generate initials from fallback or alt
		const initials = (fallback || alt || "")
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);

		return (
			<div
				ref={ref}
				className={`
          relative inline-flex items-center justify-center
          overflow-hidden
          bg-white/8
          border border-white/8
          ${sizeStyles[size]}
          ${shapeStyles[shape]}
          ${className}
        `}
				{...props}
			>
				{showImage ? (
					<img
						src={src}
						alt={alt}
						onError={() => setImageError(true)}
						className="size-full object-cover"
					/>
				) : (
					<span className="font-medium text-white/72 tracking-[0.12px]">
						{initials}
					</span>
				)}
			</div>
		);
	},
);

Avatar.displayName = "Avatar";
