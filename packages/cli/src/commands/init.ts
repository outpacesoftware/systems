import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";

interface InitOptions {
	yes?: boolean;
}

export async function init(options: InitOptions) {
	console.log();
	console.log(chalk.bold("Welcome to @outpacesoftware/systems"));
	console.log();

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

	// Detect package manager
	const packageManager = detectPackageManager(cwd);

	if (!options.yes) {
		const response = await prompts({
			type: "confirm",
			name: "proceed",
			message: `Install @outpacesoftware/systems using ${packageManager}?`,
			initial: true,
		});

		if (!response.proceed) {
			console.log(chalk.yellow("Installation cancelled."));
			process.exit(0);
		}
	}

	// Install the package
	const spinner = ora("Installing @outpacesoftware/systems...").start();

	try {
		const installCmd = getInstallCommand(packageManager);
		execSync(installCmd, { cwd, stdio: "pipe" });
		spinner.succeed("Installed @outpacesoftware/systems");
	} catch (error) {
		spinner.fail("Failed to install package");
		console.error(error);
		process.exit(1);
	}

	console.log();
	console.log(chalk.green("Success!"), "Project initialized.");
	console.log();
	console.log("Next steps:");
	console.log(`  ${chalk.cyan("outpacesystems add Button")} - Add a component`);
	console.log(
		`  ${chalk.cyan("outpacesystems add --all")} - Add all components`,
	);
	console.log();
}

function detectPackageManager(cwd: string): "pnpm" | "npm" | "yarn" | "bun" {
	if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
	if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
	if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
	return "npm";
}

function getInstallCommand(pm: "pnpm" | "npm" | "yarn" | "bun"): string {
	const pkg = "@outpacesoftware/systems";
	switch (pm) {
		case "pnpm":
			return `pnpm add ${pkg}`;
		case "yarn":
			return `yarn add ${pkg}`;
		case "bun":
			return `bun add ${pkg}`;
		default:
			return `npm install ${pkg}`;
	}
}
