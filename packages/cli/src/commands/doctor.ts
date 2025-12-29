import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

interface Check {
	name: string;
	pass: boolean;
	message: string;
}

export function doctor() {
	console.log();
	console.log(chalk.bold("Checking project setup..."));
	console.log();

	const cwd = process.cwd();
	const checks: Check[] = [];

	// Check package.json exists
	const packageJsonPath = path.join(cwd, "package.json");
	const hasPackageJson = fs.existsSync(packageJsonPath);
	checks.push({
		name: "package.json",
		pass: hasPackageJson,
		message: hasPackageJson
			? "Found package.json"
			: "No package.json found. Run this in a project directory.",
	});

	if (!hasPackageJson) {
		printChecks(checks);
		return;
	}

	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
	const deps = {
		...packageJson.dependencies,
		...packageJson.devDependencies,
	};

	// Check @outpacesoftware/systems is installed
	const hasPackage = Boolean(deps["@outpacesoftware/systems"]);
	checks.push({
		name: "@outpacesoftware/systems",
		pass: hasPackage,
		message: hasPackage
			? `Installed (${deps["@outpacesoftware/systems"]})`
			: "Not installed. Run 'outpacesystems init' to install.",
	});

	// Check React is installed
	const hasReact = Boolean(deps.react);
	checks.push({
		name: "react",
		pass: hasReact,
		message: hasReact
			? `Installed (${deps.react})`
			: "Not installed. Install React to use components.",
	});

	// Check React DOM is installed
	const hasReactDom = Boolean(deps["react-dom"]);
	checks.push({
		name: "react-dom",
		pass: hasReactDom,
		message: hasReactDom
			? `Installed (${deps["react-dom"]})`
			: "Not installed. Install react-dom to use components.",
	});

	// Check TypeScript (optional)
	const hasTypeScript = Boolean(deps.typescript);
	checks.push({
		name: "typescript",
		pass: true, // Always pass, it's optional
		message: hasTypeScript
			? `Installed (${deps.typescript})`
			: "Not installed (optional)",
	});

	printChecks(checks);
}

function printChecks(checks: Check[]) {
	for (const check of checks) {
		const icon = check.pass ? chalk.green("✓") : chalk.red("✗");
		const name = check.pass ? chalk.white(check.name) : chalk.red(check.name);
		console.log(`  ${icon} ${name.padEnd(30)} ${chalk.dim(check.message)}`);
	}

	const passed = checks.filter((c) => c.pass).length;
	const failed = checks.filter((c) => !c.pass).length;

	console.log();
	if (failed === 0) {
		console.log(chalk.green("All checks passed!"));
	} else {
		console.log(chalk.yellow(`${passed} passed, ${failed} failed`));
	}
	console.log();
}
