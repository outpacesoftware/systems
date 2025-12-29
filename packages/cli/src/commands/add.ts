import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import {
	components,
	fetchComponentFiles,
	getAllComponentNames,
	getComponent,
} from "../utils/registry.js";

interface AddOptions {
	yes?: boolean;
	all?: boolean;
	path?: string;
}

export async function add(componentNames: string[], options: AddOptions) {
	const cwd = process.cwd();

	// Check if package.json exists
	const packageJsonPath = path.join(cwd, "package.json");
	if (!fs.existsSync(packageJsonPath)) {
		console.log(
			chalk.red(
				"No package.json found. Please run this in a project directory.",
			),
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

	// Determine output directory
	const outputDir = path.join(cwd, options.path || "components/ui");

	// Create output directory if it doesn't exist
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	const spinner = ora("Installing components...").start();
	const installed: string[] = [];
	const failed: string[] = [];

	for (const componentName of selectedComponents) {
		try {
			spinner.text = `Installing ${componentName}...`;
			const files = await fetchComponentFiles(componentName);

			for (const file of files) {
				const filePath = path.join(outputDir, file.name);
				const fileDir = path.dirname(filePath);

				// Create subdirectory if needed
				if (!fs.existsSync(fileDir)) {
					fs.mkdirSync(fileDir, { recursive: true });
				}

				fs.writeFileSync(filePath, file.content);
			}

			installed.push(componentName);
		} catch {
			failed.push(componentName);
		}
	}

	if (installed.length > 0) {
		spinner.succeed(
			`Installed ${installed.length} component${installed.length > 1 ? "s" : ""}`,
		);
	} else {
		spinner.fail("No components installed");
	}

	if (failed.length > 0) {
		console.log();
		console.log(chalk.yellow(`Failed to install: ${failed.join(", ")}`));
	}

	console.log();
	console.log(chalk.bold("Components added to:"), chalk.cyan(outputDir));
	console.log();

	if (installed.length > 0) {
		console.log(chalk.bold("Import from your project:"));
		console.log();

		const relativePath = options.path || "components/ui";
		for (const name of installed) {
			console.log(
				chalk.cyan(`import { ${name} } from "@/${relativePath}/${name}";`),
			);
		}

		console.log();
		console.log(
			chalk.dim(
				`Documentation: https://systems.outpacesoftware.com/docs/components/${installed[0]?.toLowerCase()}`,
			),
		);
		console.log();
	}
}
