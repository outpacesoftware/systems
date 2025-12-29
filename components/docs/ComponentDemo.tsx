"use client";

import { useState } from "react";
// Primitives (unstyled)
import {
	Accordion,
	AlertDialog,
	Avatar,
	Button,
	Checkbox,
	CheckboxGroup,
	Collapsible,
	Combobox,
	ContextMenu,
	Dialog,
	Field,
	Input,
	Menu,
	Meter,
	NavigationMenu,
	NumberField,
	Popover,
	PreviewCard,
	Progress,
	Radio,
	RadioGroup,
	ScrollArea,
	Select,
	Separator,
	Slider,
	Switch,
	Tabs,
	Toast,
	Toggle,
	ToggleGroup,
	Toolbar,
	Tooltip,
} from "@/packages/systems/src/primitives";
// Styled components (opinionated)
import {
	Badge as StyledBadge,
	Button as StyledButton,
	Card as StyledCard,
	Checkbox as StyledCheckbox,
	Input as StyledInput,
	Switch as StyledSwitch,
} from "@/packages/systems/src/styled";

/**
 * Styled demo components for documentation previews
 */

// Button Demo - Uses styled components
function ButtonDemo() {
	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		setLoading(true);
		setTimeout(() => setLoading(false), 1500);
	};

	return (
		<div className="flex flex-wrap gap-3">
			<StyledButton variant="primary" onClick={handleClick} loading={loading}>
				{loading ? "Loading..." : "Primary"}
			</StyledButton>
			<StyledButton variant="secondary">Secondary</StyledButton>
			<StyledButton variant="ghost">Ghost</StyledButton>
			<StyledButton variant="danger">Danger</StyledButton>
			<StyledButton disabled>Disabled</StyledButton>
		</div>
	);
}

// Input Demo - Uses styled components
function InputDemo() {
	const [value, setValue] = useState("");
	const [error, setError] = useState("");

	return (
		<div className="flex flex-col gap-4 w-full max-w-xs">
			<StyledInput
				label="Username"
				placeholder="Enter your username..."
				value={value}
				onChange={(val) => {
					setValue(val);
					setError(
						val.length > 0 && val.length < 3
							? "Must be at least 3 characters"
							: "",
					);
				}}
				error={error}
				description="This will be your public display name"
			/>
			<StyledInput label="Email" placeholder="Enter your email..." required />
			<StyledInput placeholder="Disabled input" disabled />
		</div>
	);
}

// Checkbox Demo - Uses styled components
function CheckboxDemo() {
	const [checked1, setChecked1] = useState(false);
	const [checked2, setChecked2] = useState(true);

	return (
		<div className="flex flex-col gap-3">
			<StyledCheckbox
				label="Accept terms and conditions"
				description="You agree to our Terms of Service and Privacy Policy"
				checked={checked1}
				onChange={setChecked1}
			/>
			<StyledCheckbox
				label="Enable notifications"
				checked={checked2}
				onChange={setChecked2}
			/>
			<StyledCheckbox label="Disabled option" disabled />
		</div>
	);
}

// Switch Demo - Uses styled components
function SwitchDemo() {
	const [enabled1, setEnabled1] = useState(false);
	const [enabled2, setEnabled2] = useState(true);

	return (
		<div className="flex flex-col gap-4">
			<StyledSwitch
				label="Email notifications"
				description="Receive notifications via email"
				checked={enabled1}
				onChange={setEnabled1}
			/>
			<StyledSwitch
				label="Dark mode"
				checked={enabled2}
				onChange={setEnabled2}
			/>
			<StyledSwitch label="Disabled option" disabled />
		</div>
	);
}

// Select Demo
function SelectDemo() {
	const [value, setValue] = useState("");

	return (
		<div className="w-full max-w-xs">
			<Select.Root value={value} onChange={setValue}>
				<Select.Trigger
					placeholder="Select a framework..."
					className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-lg text-white text-left hover:bg-white/8 transition-colors data-[placeholder]:text-white/32"
				/>
				<Select.Content className="absolute mt-1 w-full max-w-xs bg-black border border-white/8 rounded-lg shadow-xl overflow-hidden z-50">
					<Select.Option
						value="react"
						className="px-3 py-2 text-white/72 hover:bg-white/8 cursor-pointer data-[selected]:bg-white/8 data-[selected]:text-white"
					>
						React
					</Select.Option>
					<Select.Option
						value="vue"
						className="px-3 py-2 text-white/72 hover:bg-white/8 cursor-pointer data-[selected]:bg-white/8 data-[selected]:text-white"
					>
						Vue
					</Select.Option>
					<Select.Option
						value="svelte"
						className="px-3 py-2 text-white/72 hover:bg-white/8 cursor-pointer data-[selected]:bg-white/8 data-[selected]:text-white"
					>
						Svelte
					</Select.Option>
					<Select.Option
						value="angular"
						disabled
						className="px-3 py-2 text-white/32 cursor-not-allowed"
					>
						Angular (coming soon)
					</Select.Option>
				</Select.Content>
			</Select.Root>
		</div>
	);
}

// Dialog Demo
function DialogDemo() {
	return (
		<Dialog.Root>
			<Dialog.Trigger className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/88 transition-colors">
				Open Dialog
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Backdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
				<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black border border-white/8 rounded-xl p-6 shadow-2xl z-50">
					<Dialog.Title className="text-xl font-semibold text-white mb-2">
						Dialog Title
					</Dialog.Title>
					<Dialog.Description className="text-white/60 mb-6">
						This is a modal dialog with focus trap and keyboard navigation.
						Press Escape or click the backdrop to close.
					</Dialog.Description>
					<div className="flex justify-end gap-3">
						<Dialog.Close className="px-4 py-2 text-white/72 hover:text-white hover:bg-white/4 rounded-lg transition-colors">
							Cancel
						</Dialog.Close>
						<Dialog.Close className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/88 transition-colors">
							Confirm
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

// Tooltip Demo
function TooltipDemo() {
	return (
		<div className="flex gap-6">
			<Tooltip.Root>
				<Tooltip.Trigger className="px-4 py-2 bg-white/8 text-white rounded-lg hover:bg-white/16 transition-colors cursor-default">
					Hover me
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="px-3 py-1.5 bg-white text-black text-sm rounded-lg shadow-lg">
						Helpful tooltip text
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>

			<Tooltip.Root delayDuration={0}>
				<Tooltip.Trigger className="px-4 py-2 bg-white/8 text-white rounded-lg hover:bg-white/16 transition-colors cursor-default">
					No delay
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="px-3 py-1.5 bg-white text-black text-sm rounded-lg shadow-lg">
						Instant tooltip
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</div>
	);
}

// Radio Demo
function RadioDemo() {
	const [value, setValue] = useState("option1");

	return (
		<div className="flex flex-col gap-3">
			{["option1", "option2", "option3"].map((option) => (
				<label key={option} className="flex items-center gap-2 cursor-pointer">
					<Radio
						checked={value === option}
						onChange={() => setValue(option)}
						className="w-5 h-5 rounded-full border border-white/16 bg-white/4 checked:border-white checked:bg-white appearance-none cursor-pointer relative after:absolute after:inset-[5px] after:rounded-full after:bg-black after:opacity-0 checked:after:opacity-100"
					/>
					<span className="text-white/72 capitalize">
						{option.replace("option", "Option ")}
					</span>
				</label>
			))}
		</div>
	);
}

// RadioGroup Demo
function RadioGroupDemo() {
	const [value, setValue] = useState("comfortable");

	return (
		<RadioGroup.Root
			value={value}
			onChange={setValue}
			className="flex flex-col gap-3"
		>
			{["default", "comfortable", "compact"].map((option) => (
				<RadioGroup.Item
					key={option}
					value={option}
					className="flex items-center gap-2 cursor-pointer"
				>
					<span className="w-5 h-5 rounded-full border border-white/16 bg-white/4 flex items-center justify-center [[data-state=checked]_&]:border-white [[data-state=checked]_&]:bg-white transition-colors">
						<RadioGroup.Indicator className="w-2 h-2 rounded-full bg-black" />
					</span>
					<span className="text-white/72 capitalize">{option}</span>
				</RadioGroup.Item>
			))}
		</RadioGroup.Root>
	);
}

// Slider Demo
function SliderDemo() {
	const [value, setValue] = useState(50);

	return (
		<div className="w-full max-w-xs space-y-4">
			<Slider.Root
				value={value}
				onChange={setValue}
				min={0}
				max={100}
				className="relative flex items-center w-full h-5 cursor-pointer"
			>
				<Slider.Track className="relative w-full h-1 bg-white/8 rounded-full">
					<Slider.Range
						className="absolute h-full bg-white rounded-full"
						style={{ width: `${value}%` }}
					/>
				</Slider.Track>
				<Slider.Thumb
					className="absolute w-4 h-4 bg-white rounded-full shadow-md -translate-x-1/2 hover:scale-110 transition-transform"
					style={{ left: `${value}%` }}
				/>
			</Slider.Root>
			<div className="text-white/48 text-sm">Value: {value}</div>
		</div>
	);
}

// Tabs Demo
function TabsDemo() {
	return (
		<Tabs.Root defaultValue="account" className="w-full max-w-md">
			<Tabs.List className="flex border-b border-white/8">
				<Tabs.Trigger
					value="account"
					className="px-4 py-2 text-white/72 border-b-2 border-transparent data-[active]:text-white data-[active]:border-white transition-colors"
				>
					Account
				</Tabs.Trigger>
				<Tabs.Trigger
					value="password"
					className="px-4 py-2 text-white/72 border-b-2 border-transparent data-[active]:text-white data-[active]:border-white transition-colors"
				>
					Password
				</Tabs.Trigger>
				<Tabs.Trigger
					value="settings"
					className="px-4 py-2 text-white/72 border-b-2 border-transparent data-[active]:text-white data-[active]:border-white transition-colors"
				>
					Settings
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="account" className="p-4 text-white/72">
				Make changes to your account here.
			</Tabs.Content>
			<Tabs.Content value="password" className="p-4 text-white/72">
				Change your password here.
			</Tabs.Content>
			<Tabs.Content value="settings" className="p-4 text-white/72">
				Manage your settings here.
			</Tabs.Content>
		</Tabs.Root>
	);
}

// Progress Demo
function ProgressDemo() {
	const [progress, setProgress] = useState(60);

	return (
		<div className="w-full max-w-xs space-y-4">
			<Progress.Root
				value={progress}
				className="relative w-full h-2 bg-white/8 rounded-full overflow-hidden"
			>
				<Progress.Indicator
					className="h-full bg-white transition-all"
					style={{ width: `${progress}%` }}
				/>
			</Progress.Root>
			<div className="flex gap-2">
				<Button
					onClick={() => setProgress(Math.max(0, progress - 10))}
					className="px-3 py-1 bg-white/8 text-white rounded text-sm"
				>
					-10%
				</Button>
				<Button
					onClick={() => setProgress(Math.min(100, progress + 10))}
					className="px-3 py-1 bg-white/8 text-white rounded text-sm"
				>
					+10%
				</Button>
			</div>
		</div>
	);
}

// Accordion Demo
function AccordionDemo() {
	return (
		<Accordion.Root
			type="single"
			className="w-full max-w-md border border-white/8 rounded-lg overflow-hidden"
		>
			<Accordion.Item
				value="item-1"
				className="border-b border-white/8 last:border-b-0"
			>
				<Accordion.Trigger className="w-full px-4 py-3 text-left text-white hover:bg-white/4 flex justify-between items-center">
					Is it accessible?
					<span className="text-white/48">+</span>
				</Accordion.Trigger>
				<Accordion.Content className="px-4 py-3 text-white/72 bg-white/4">
					Yes. It adheres to the WAI-ARIA design pattern.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item
				value="item-2"
				className="border-b border-white/8 last:border-b-0"
			>
				<Accordion.Trigger className="w-full px-4 py-3 text-left text-white hover:bg-white/4 flex justify-between items-center">
					Is it styled?
					<span className="text-white/48">+</span>
				</Accordion.Trigger>
				<Accordion.Content className="px-4 py-3 text-white/72 bg-white/4">
					No. It&apos;s unstyled by default, giving you freedom over the look
					and feel.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item
				value="item-3"
				className="border-b border-white/8 last:border-b-0"
			>
				<Accordion.Trigger className="w-full px-4 py-3 text-left text-white hover:bg-white/4 flex justify-between items-center">
					Can it be animated?
					<span className="text-white/48">+</span>
				</Accordion.Trigger>
				<Accordion.Content className="px-4 py-3 text-white/72 bg-white/4">
					Yes! You can animate the opening and closing.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	);
}

// Avatar Demo
function AvatarDemo() {
	return (
		<div className="flex items-center gap-4">
			<Avatar.Root className="w-12 h-12 rounded-full overflow-hidden bg-white/8">
				<Avatar.Image
					src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
					alt="User avatar"
					className="w-full h-full object-cover"
				/>
				<Avatar.Fallback className="w-full h-full flex items-center justify-center text-white font-medium">
					JD
				</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root className="w-12 h-12 rounded-full overflow-hidden bg-white/8">
				<Avatar.Fallback className="w-full h-full flex items-center justify-center text-white font-medium bg-green-500">
					AB
				</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root className="w-12 h-12 rounded-full overflow-hidden bg-white/8">
				<Avatar.Fallback className="w-full h-full flex items-center justify-center text-white font-medium bg-violet-500">
					CD
				</Avatar.Fallback>
			</Avatar.Root>
		</div>
	);
}

// Separator Demo
function SeparatorDemo() {
	return (
		<div className="w-full max-w-md">
			<div className="text-white mb-4">Above the separator</div>
			<Separator className="h-px bg-white/8 w-full" />
			<div className="text-white mt-4">Below the separator</div>
			<div className="flex items-center gap-4 mt-6">
				<span className="text-white/72">Item 1</span>
				<Separator orientation="vertical" className="w-px h-4 bg-white/8" />
				<span className="text-white/72">Item 2</span>
				<Separator orientation="vertical" className="w-px h-4 bg-white/8" />
				<span className="text-white/72">Item 3</span>
			</div>
		</div>
	);
}

// Toggle Demo
function ToggleDemo() {
	const [pressed, setPressed] = useState(false);

	return (
		<div className="flex gap-3">
			<Toggle
				pressed={pressed}
				onChange={setPressed}
				className="px-4 py-2 rounded-lg border border-white/8 text-white/72 data-[pressed]:bg-white data-[pressed]:text-black transition-colors"
			>
				{pressed ? "On" : "Off"}
			</Toggle>
			<Toggle
				defaultPressed
				className="px-4 py-2 rounded-lg border border-white/8 text-white/72 data-[pressed]:bg-white data-[pressed]:text-black transition-colors"
			>
				Bold
			</Toggle>
		</div>
	);
}

// ToggleGroup Demo
function ToggleGroupDemo() {
	return (
		<ToggleGroup.Root
			type="single"
			defaultValue="center"
			className="flex border border-white/8 rounded-lg overflow-hidden"
		>
			<ToggleGroup.Item
				value="left"
				className="px-4 py-2 text-white/72 data-[state=on]:bg-white data-[state=on]:text-black transition-colors"
			>
				Left
			</ToggleGroup.Item>
			<ToggleGroup.Item
				value="center"
				className="px-4 py-2 text-white/72 data-[state=on]:bg-white data-[state=on]:text-black transition-colors border-x border-white/8"
			>
				Center
			</ToggleGroup.Item>
			<ToggleGroup.Item
				value="right"
				className="px-4 py-2 text-white/72 data-[state=on]:bg-white data-[state=on]:text-black transition-colors"
			>
				Right
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	);
}

// Menu Demo
function MenuDemo() {
	return (
		<Menu.Root>
			<Menu.Trigger className="px-4 py-2 bg-white/8 text-white rounded-lg hover:bg-white/16 transition-colors">
				Open Menu
			</Menu.Trigger>
			<Menu.Portal>
				<Menu.Content className="min-w-[180px] bg-black border border-white/8 rounded-lg shadow-xl overflow-hidden z-50">
					<Menu.Item
						onSelect={() => {}}
						className="px-3 py-2 text-white/72 hover:bg-white/8 cursor-pointer"
					>
						New File
					</Menu.Item>
					<Menu.Item
						onSelect={() => {}}
						className="px-3 py-2 text-white/72 hover:bg-white/8 cursor-pointer"
					>
						Open...
					</Menu.Item>
					<Menu.Separator className="h-px bg-white/8 my-1" />
					<Menu.Item
						onSelect={() => {}}
						className="px-3 py-2 text-white/72 hover:bg-white/8 cursor-pointer"
					>
						Save
					</Menu.Item>
					<Menu.Item
						disabled
						className="px-3 py-2 text-white/32 cursor-not-allowed"
					>
						Save As... (disabled)
					</Menu.Item>
				</Menu.Content>
			</Menu.Portal>
		</Menu.Root>
	);
}

// Popover Demo
function PopoverDemo() {
	return (
		<Popover.Root>
			<Popover.Trigger className="px-4 py-2 bg-white/8 text-white rounded-lg hover:bg-white/16 transition-colors">
				Open Popover
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className="w-80 p-4 bg-black border border-white/8 rounded-lg shadow-xl z-50">
					<div className="text-white font-medium mb-2">Dimensions</div>
					<div className="text-white/60 text-sm mb-4">
						Set the dimensions for the layer.
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div>
							<label className="text-white/48 text-xs">Width</label>
							<Input
								defaultValue="100%"
								className="w-full px-2 py-1 bg-white/4 border border-white/8 rounded text-white text-sm"
							/>
						</div>
						<div>
							<label className="text-white/48 text-xs">Height</label>
							<Input
								defaultValue="auto"
								className="w-full px-2 py-1 bg-white/4 border border-white/8 rounded text-white text-sm"
							/>
						</div>
					</div>
					<Popover.Close className="absolute top-2 right-2 text-white/48 hover:text-white">
						×
					</Popover.Close>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}

// Toast Demo
function ToastDemo() {
	const [showToast, setShowToast] = useState(false);

	return (
		<div>
			<Button
				onClick={() => setShowToast(true)}
				className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/88 transition-colors"
			>
				Show Toast
			</Button>
			<Toast.Provider>
				{showToast && (
					<Toast.Root
						open={showToast}
						onOpenChange={setShowToast}
						duration={3000}
						className="fixed bottom-4 right-4 p-4 bg-black border border-white/8 rounded-lg shadow-xl z-50"
					>
						<Toast.Title className="text-white font-medium">
							Success!
						</Toast.Title>
						<Toast.Description className="text-white/60 text-sm">
							Your changes have been saved.
						</Toast.Description>
						<Toast.Close className="absolute top-2 right-2 text-white/48 hover:text-white">
							×
						</Toast.Close>
					</Toast.Root>
				)}
				<Toast.Viewport />
			</Toast.Provider>
		</div>
	);
}

// AlertDialog Demo
function AlertDialogDemo() {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors">
				Delete Item
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
				<AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black border border-white/8 rounded-xl p-6 shadow-2xl z-50">
					<AlertDialog.Title className="text-xl font-semibold text-white mb-2">
						Are you sure?
					</AlertDialog.Title>
					<AlertDialog.Description className="text-white/60 mb-6">
						This action cannot be undone. This will permanently delete the item
						from your account.
					</AlertDialog.Description>
					<div className="flex justify-end gap-3">
						<AlertDialog.Cancel className="px-4 py-2 text-white/72 hover:text-white hover:bg-white/4 rounded-lg transition-colors">
							Cancel
						</AlertDialog.Cancel>
						<AlertDialog.Action className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
							Delete
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}

// ScrollArea Demo
function ScrollAreaDemo() {
	return (
		<ScrollArea.Root className="w-full max-w-xs h-48 border border-white/8 rounded-lg">
			<ScrollArea.Viewport className="w-full h-full p-4">
				<div className="space-y-4">
					{Array.from({ length: 20 }).map((_, i) => (
						<div key={i} className="text-white/72 py-2 border-b border-white/4">
							Item {i + 1}
						</div>
					))}
				</div>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar
				orientation="vertical"
				className="w-2 bg-white/4 rounded-full"
			>
				<ScrollArea.Thumb className="bg-white/16 rounded-full" />
			</ScrollArea.Scrollbar>
		</ScrollArea.Root>
	);
}

// Collapsible Demo
function CollapsibleDemo() {
	const [open, setOpen] = useState(false);

	return (
		<Collapsible.Root
			open={open}
			onOpenChange={setOpen}
			className="w-full max-w-md"
		>
			<Collapsible.Trigger className="flex items-center justify-between w-full px-4 py-2 bg-white/4 rounded-lg text-white hover:bg-white/8 transition-colors">
				<span>Recent Projects (3)</span>
				<span>{open ? "−" : "+"}</span>
			</Collapsible.Trigger>
			<Collapsible.Content className="mt-2 space-y-2">
				<div className="px-4 py-2 bg-white/4 rounded-lg text-white/72">
					Design System v2.0
				</div>
				<div className="px-4 py-2 bg-white/4 rounded-lg text-white/72">
					Marketing Website
				</div>
				<div className="px-4 py-2 bg-white/4 rounded-lg text-white/72">
					Mobile App
				</div>
			</Collapsible.Content>
		</Collapsible.Root>
	);
}

// ContextMenu Demo
function ContextMenuDemo() {
	return (
		<ContextMenu.Root>
			<ContextMenu.Trigger className="block w-64 h-32 bg-white/4 border border-dashed border-white/16 rounded-lg flex items-center justify-center text-white/48">
				Right click here
			</ContextMenu.Trigger>
			<ContextMenu.Portal>
				<ContextMenu.Content className="min-w-[180px] bg-black border border-white/8 rounded-lg shadow-xl overflow-hidden z-50">
					<ContextMenu.Item
						onSelect={() => {}}
						className="px-3 py-2 text-white/72 hover:bg-white/8 cursor-pointer"
					>
						Cut
					</ContextMenu.Item>
					<ContextMenu.Item
						onSelect={() => {}}
						className="px-3 py-2 text-white/72 hover:bg-white/8 cursor-pointer"
					>
						Copy
					</ContextMenu.Item>
					<ContextMenu.Item
						onSelect={() => {}}
						className="px-3 py-2 text-white/72 hover:bg-white/8 cursor-pointer"
					>
						Paste
					</ContextMenu.Item>
					<ContextMenu.Separator className="h-px bg-white/8 my-1" />
					<ContextMenu.Item
						onSelect={() => {}}
						className="px-3 py-2 text-red-400 hover:bg-white/8 cursor-pointer"
					>
						Delete
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
	);
}

// Meter Demo
function MeterDemo() {
	return (
		<div className="w-full max-w-xs space-y-4">
			<div>
				<div className="text-white/48 text-sm mb-1">Storage (75%)</div>
				<Meter.Root
					value={75}
					className="relative w-full h-2 bg-white/8 rounded-full overflow-hidden"
				>
					<Meter.Track>
						<Meter.Indicator
							className="h-full bg-amber-500"
							style={{ width: "75%" }}
						/>
					</Meter.Track>
				</Meter.Root>
			</div>
			<div>
				<div className="text-white/48 text-sm mb-1">Battery (90%)</div>
				<Meter.Root
					value={90}
					className="relative w-full h-2 bg-white/8 rounded-full overflow-hidden"
				>
					<Meter.Track>
						<Meter.Indicator
							className="h-full bg-green-500"
							style={{ width: "90%" }}
						/>
					</Meter.Track>
				</Meter.Root>
			</div>
			<div>
				<div className="text-white/48 text-sm mb-1">Memory (25%)</div>
				<Meter.Root
					value={25}
					className="relative w-full h-2 bg-white/8 rounded-full overflow-hidden"
				>
					<Meter.Track>
						<Meter.Indicator
							className="h-full bg-sky-500"
							style={{ width: "25%" }}
						/>
					</Meter.Track>
				</Meter.Root>
			</div>
		</div>
	);
}

// NumberField Demo
function NumberFieldDemo() {
	const [value, setValue] = useState(5);

	return (
		<NumberField.Root
			value={value}
			onValueChange={setValue}
			min={0}
			max={10}
			className="w-full max-w-[160px]"
		>
			<NumberField.Label className="text-white/48 text-sm mb-1 block">
				Quantity
			</NumberField.Label>
			<NumberField.Group className="flex border border-white/8 rounded-lg overflow-hidden">
				<NumberField.Decrement className="px-3 py-2 bg-white/4 text-white hover:bg-white/8 transition-colors">
					−
				</NumberField.Decrement>
				<NumberField.Input className="w-16 text-center bg-transparent text-white border-x border-white/8 focus:outline-none" />
				<NumberField.Increment className="px-3 py-2 bg-white/4 text-white hover:bg-white/8 transition-colors">
					+
				</NumberField.Increment>
			</NumberField.Group>
		</NumberField.Root>
	);
}

// Toolbar Demo
function ToolbarDemo() {
	return (
		<Toolbar.Root className="flex items-center gap-1 p-1 bg-white/4 border border-white/8 rounded-lg">
			<Toolbar.Button className="px-3 py-1.5 text-white/72 hover:bg-white/8 rounded transition-colors font-bold">
				B
			</Toolbar.Button>
			<Toolbar.Button className="px-3 py-1.5 text-white/72 hover:bg-white/8 rounded transition-colors italic">
				I
			</Toolbar.Button>
			<Toolbar.Button className="px-3 py-1.5 text-white/72 hover:bg-white/8 rounded transition-colors underline">
				U
			</Toolbar.Button>
			<Toolbar.Separator className="w-px h-6 bg-white/8 mx-1" />
			<Toolbar.Button className="px-3 py-1.5 text-white/72 hover:bg-white/8 rounded transition-colors">
				Left
			</Toolbar.Button>
			<Toolbar.Button className="px-3 py-1.5 text-white/72 hover:bg-white/8 rounded transition-colors">
				Center
			</Toolbar.Button>
			<Toolbar.Button className="px-3 py-1.5 text-white/72 hover:bg-white/8 rounded transition-colors">
				Right
			</Toolbar.Button>
		</Toolbar.Root>
	);
}

// Field Demo
function FieldDemo() {
	const [hasError, setHasError] = useState(false);

	return (
		<div className="w-full max-w-xs space-y-4">
			<Field.Root>
				<Field.Label className="text-white text-sm mb-1 block">
					Email
				</Field.Label>
				<Field.Control>
					<Input
						type="email"
						placeholder="Enter your email"
						className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-lg text-white placeholder:text-white/32"
					/>
				</Field.Control>
				<Field.Description className="text-white/48 text-xs mt-1">
					We&apos;ll never share your email.
				</Field.Description>
			</Field.Root>

			<Field.Root hasError={hasError}>
				<Field.Label className="text-white text-sm mb-1 block">
					Password
				</Field.Label>
				<Field.Control>
					<Input
						type="password"
						placeholder="Enter password"
						onChange={(e) =>
							setHasError(
								e.target.value.length > 0 && e.target.value.length < 6,
							)
						}
						className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-lg text-white placeholder:text-white/32 data-[error]:border-red-500"
					/>
				</Field.Control>
				<Field.Error className="text-red-400 text-xs mt-1">
					Password must be at least 6 characters.
				</Field.Error>
			</Field.Root>
		</div>
	);
}

// PreviewCard Demo
function PreviewCardDemo() {
	return (
		<PreviewCard.Root>
			<PreviewCard.Trigger href="#" className="text-sky-400 hover:underline">
				Hover for preview
			</PreviewCard.Trigger>
			<PreviewCard.Portal>
				<PreviewCard.Content className="w-64 p-4 bg-black border border-white/8 rounded-lg shadow-xl z-50">
					<div className="flex items-center gap-3 mb-3">
						<div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-medium">
							JD
						</div>
						<div>
							<div className="text-white font-medium">John Doe</div>
							<div className="text-white/48 text-sm">@johndoe</div>
						</div>
					</div>
					<p className="text-white/72 text-sm">
						Software engineer. Building things for the web.
					</p>
				</PreviewCard.Content>
			</PreviewCard.Portal>
		</PreviewCard.Root>
	);
}

// Combobox Demo
function ComboboxDemo() {
	const [value, setValue] = useState("");
	const options = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

	return (
		<Combobox.Root
			value={value}
			onValueChange={setValue}
			className="w-full max-w-xs relative"
		>
			<div className="flex border border-white/8 rounded-lg overflow-hidden">
				<Combobox.Input
					placeholder="Search fruits..."
					className="flex-1 px-3 py-2 bg-white/4 text-white placeholder:text-white/32 focus:outline-none"
				/>
				<Combobox.Trigger className="px-3 bg-white/4 text-white/48 hover:text-white transition-colors" />
			</div>
			<Combobox.Portal>
				<Combobox.Content className="absolute mt-1 w-full max-w-xs bg-black border border-white/8 rounded-lg shadow-xl overflow-hidden z-50">
					{options.map((option) => (
						<Combobox.Item
							key={option}
							value={option.toLowerCase()}
							className="px-3 py-2 text-white/72 hover:bg-white/8 cursor-pointer data-[selected]:bg-white/8 data-[selected]:text-white"
						>
							{option}
						</Combobox.Item>
					))}
					<Combobox.Empty className="px-3 py-2 text-white/48">
						No results found
					</Combobox.Empty>
				</Combobox.Content>
			</Combobox.Portal>
		</Combobox.Root>
	);
}

// NavigationMenu Demo
function NavigationMenuDemo() {
	return (
		<NavigationMenu.Root className="relative">
			<NavigationMenu.List className="flex items-center gap-1">
				<NavigationMenu.Item value="home">
					<NavigationMenu.Link
						href="#"
						active
						className="px-3 py-2 text-white rounded-lg hover:bg-white/8 transition-colors data-[active]:bg-white/8"
					>
						Home
					</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item value="about">
					<NavigationMenu.Link
						href="#"
						className="px-3 py-2 text-white/72 rounded-lg hover:bg-white/8 hover:text-white transition-colors"
					>
						About
					</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item value="products">
					<NavigationMenu.Link
						href="#"
						className="px-3 py-2 text-white/72 rounded-lg hover:bg-white/8 hover:text-white transition-colors"
					>
						Products
					</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item value="contact">
					<NavigationMenu.Link
						href="#"
						className="px-3 py-2 text-white/72 rounded-lg hover:bg-white/8 hover:text-white transition-colors"
					>
						Contact
					</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}

// CheckboxGroup Demo
function CheckboxGroupDemo() {
	const [values, setValues] = useState(["react"]);

	return (
		<CheckboxGroup.Root
			value={values}
			onValueChange={setValues}
			className="space-y-3"
		>
			<CheckboxGroup.Label className="text-white font-medium">
				Select frameworks
			</CheckboxGroup.Label>
			{["react", "vue", "svelte", "angular"].map((framework) => (
				<div key={framework} className="flex items-center gap-2">
					<CheckboxGroup.Item
						value={framework}
						id={framework}
						className="w-5 h-5 rounded border border-white/16 bg-white/4 checked:bg-white checked:border-white appearance-none cursor-pointer relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-black after:opacity-0 checked:after:opacity-100 after:text-sm"
					/>
					<CheckboxGroup.ItemLabel
						htmlFor={framework}
						className="text-white/72 capitalize cursor-pointer"
					>
						{framework}
					</CheckboxGroup.ItemLabel>
				</div>
			))}
		</CheckboxGroup.Root>
	);
}

// Badge Demo - Uses styled components
function BadgeDemo() {
	return (
		<div className="flex flex-wrap gap-3">
			<StyledBadge variant="default">Default</StyledBadge>
			<StyledBadge variant="muted">Muted</StyledBadge>
			<StyledBadge variant="accent">Accent</StyledBadge>
			<StyledBadge size="sm" variant="default">
				Small
			</StyledBadge>
			<StyledBadge size="sm" variant="accent">
				Pro
			</StyledBadge>
		</div>
	);
}

// Card Demo - Uses styled components
function CardDemo() {
	return (
		<StyledCard padding="none" className="w-full max-w-sm">
			<StyledCard.Header>
				<StyledCard.Title>Card Title</StyledCard.Title>
				<StyledCard.Description>
					This is a styled card component with header, content, and footer.
				</StyledCard.Description>
			</StyledCard.Header>
			<StyledCard.Content>
				<p className="text-sm text-white/72">
					Card content goes here. You can add any components inside.
				</p>
			</StyledCard.Content>
			<StyledCard.Footer>
				<StyledButton variant="ghost" size="sm">
					Cancel
				</StyledButton>
				<StyledButton variant="primary" size="sm">
					Save
				</StyledButton>
			</StyledCard.Footer>
		</StyledCard>
	);
}

// Component map
const demos: Record<string, React.FC> = {
	button: ButtonDemo,
	input: InputDemo,
	checkbox: CheckboxDemo,
	checkboxgroup: CheckboxGroupDemo,
	switch: SwitchDemo,
	select: SelectDemo,
	dialog: DialogDemo,
	alertdialog: AlertDialogDemo,
	tooltip: TooltipDemo,
	radio: RadioDemo,
	radiogroup: RadioGroupDemo,
	slider: SliderDemo,
	tabs: TabsDemo,
	progress: ProgressDemo,
	accordion: AccordionDemo,
	avatar: AvatarDemo,
	badge: BadgeDemo,
	card: CardDemo,
	separator: SeparatorDemo,
	toggle: ToggleDemo,
	togglegroup: ToggleGroupDemo,
	menu: MenuDemo,
	popover: PopoverDemo,
	toast: ToastDemo,
	scrollarea: ScrollAreaDemo,
	collapsible: CollapsibleDemo,
	contextmenu: ContextMenuDemo,
	meter: MeterDemo,
	numberfield: NumberFieldDemo,
	toolbar: ToolbarDemo,
	field: FieldDemo,
	previewcard: PreviewCardDemo,
	combobox: ComboboxDemo,
	navigationmenu: NavigationMenuDemo,
};

interface ComponentDemoProps {
	name: string;
}

export function ComponentDemo({ name }: ComponentDemoProps) {
	const Demo = demos[name.toLowerCase()];

	if (!Demo) {
		return (
			<div className="p-8 text-center text-white/48">
				No demo available for this component
			</div>
		);
	}

	return (
		<div className="p-8 bg-white/[0.02] border border-white/8 rounded-lg">
			<Demo />
		</div>
	);
}
