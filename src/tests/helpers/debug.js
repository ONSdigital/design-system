import chalk from 'chalk';

let consoleSubscriptionPage = null;

export function quietLog(text, type = 'info') {
  const colorize = type === 'error' ? chalk.red : type === 'warning' ? chalk.yellow : chalk.white;
  process.stdout.write(`${colorize(text)}\n`);
}

export function verifyConsoleSubscription(page) {
  if (consoleSubscriptionPage === page) {
    return;
  }

  consoleSubscriptionPage = page;

  page.on('console', message => {
    quietLog(`browser ${message.type()}: ${message.text()}`, message.type());

    const { url, lineNumber, columnNumber } = message.location();
    if (!!url || !!lineNumber || !!columnNumber) {
      process.stdout.write(chalk.grey(`  ${url}:${lineNumber}:${columnNumber}\n`));
    }
  });
}
