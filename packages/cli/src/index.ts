#!/usr/bin/env node

import { Command } from "commander";
import { add } from "./commands/add.js";
import { init } from "./commands/init.js";

const program = new Command();

program
	.name("outpacesystems")
	.description("CLI for @outpacesoftware/systems design system")
	.version("0.0.1");

program
	.command("init")
	.description("Initialize design system in your project")
	.option("-y, --yes", "Skip prompts and use defaults")
	.action(init);

program
	.command("add")
	.description("Add components to your project")
	.argument("[components...]", "Components to add")
	.option("-y, --yes", "Skip prompts and use defaults")
	.option("-a, --all", "Add all components")
	.action(add);

program.parse();
