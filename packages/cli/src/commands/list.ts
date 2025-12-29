import chalk from "chalk";
import { components } from "../utils/registry.js";

export function list() {
	console.log();
	console.log(chalk.bold("Available components:"));
	console.log();

	for (const component of components) {
		console.log(
			`  ${chalk.cyan(component.name.padEnd(20))} ${chalk.dim(component.description)}`,
		);
	}

	console.log();
	console.log(chalk.dim(`${components.length} components available`));
	console.log();
}
