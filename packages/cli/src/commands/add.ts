import chalk from "chalk";
import fs from "fs";
import ora from "ora";
import path from "path";
import prompts from "prompts";
import {
	components,
	getAllComponentNames,
	getComponent,
} from "../utils/registry.js";

interface AddOptions {
	yes?: boolean;
	all?: boolean;
}

export async function add(
	componentNames: string[],
	options: AddOptions
) {
	const cwd = process.cwd();

	// Check if package.json exists
	const packageJsonPath = path.join(cwd, "package.json");
	if (!fs.existsSync(packageJsonPath)) {
		console.log(
			chalk.red("No package.json found. Please run this in a project directory.")
		);
		process.exit(1);
	}

	// Check if @outpacesoftware/systems is installed
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
	const deps = {
		...packageJson.dependencies,
		...packageJson.devDependencies,
	};

	if (!deps["@outpacesoftware/systems"]) {
		console.log(
			chalk.yellow(
				"@outpacesoftware/systems is not installed. Run 'outpacesystems init' first."
			)
		);
		process.exit(1);
	}

	let selectedComponents: string[] = [];

	// Handle --all flag
	if (options.all) {
		selectedComponents = getAllComponentNames();
	}
	// Handle component arguments
	else if (componentNames.length > 0) {
		// Validate component names
		for (const name of componentNames) {
			const component = getComponent(name);
			if (!component) {
				console.log(chalk.red(`Unknown component: ${name}`));
				console.log();
				console.log("Available components:");
				for (const c of components) {
					console.log(`  ${chalk.cyan(c.name)} - ${c.description}`);
				}
				process.exit(1);
			}
			selectedComponents.push(component.name);
		}
	}
	// Interactive selection
	else {
		const response = await prompts({
			type: "multiselect",
			name: "components",
			message: "Select components to add",
			choices: components.map((c) => ({
				title: c.name,
				description: c.description,
				value: c.name,
			})),
			hint: "- Space to select. Return to submit",
		});

		if (!response.components || response.components.length === 0) {
			console.log(chalk.yellow("No components selected."));
			process.exit(0);
		}

		selectedComponents = response.components;
	}

	console.log();

	// Generate import examples
	const spinner = ora("Generating component imports...").start();

	// Simulate a brief delay for UX
	await new Promise((resolve) => setTimeout(resolve, 500));

	spinner.succeed("Components ready to use");

	console.log();
	console.log(chalk.bold("Add these imports to your code:"));
	console.log();

	for (const name of selectedComponents) {
		console.log(
			chalk.cyan(
				`import { ${name} } from "@outpacesoftware/systems/${name}";`
			)
		);
	}

	console.log();
	console.log(
		chalk.dim(
			`Documentation: https://systems.outpacesoftware.com/docs/components/${selectedComponents[0]?.toLowerCase()}`
		)
	);
	console.log();
}
