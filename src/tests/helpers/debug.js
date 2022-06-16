import chalk from 'chalk';

let consoleSubscriptionPage = null;

export function verifyConsoleSubscription(page) {
  if (consoleSubscriptionPage === page) {
    return;
  }

  consoleSubscriptionPage = page;

  page.on('console', message => {
    const type = message.type();
    const colorize = type === 'error' ? chalk.red : type === 'warning' ? chalk.yellow : chalk.white;

    const output = `browser ${type}: ${message.text()}`;
    process.stdout.write(`${colorize(output)}\n`);

    const { url, lineNumber, columnNumber } = message.location();
    process.stdout.write(chalk.grey(`  ${url}:${lineNumber}:${columnNumber}\n`));
  });
}
