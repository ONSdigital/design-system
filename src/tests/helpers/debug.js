import chalk from 'chalk';

let consoleSubscriptionPage = null;

export function quietLog(text, type = 'info') {
  const colorize = type === 'error' ? chalk.red : type === 'warning' ? chalk.yellow : chalk.white;
  process.stdout.write(`${colorize(text)}\n`);
}

async function extractTextFromMessage(message) {
  let messageParts;

  try {
    // Workaround for situation where `message.text()` returns "JSHandle:error" rather than
    // the actual error text. This is some sort of serialization thing between Chromium and
    // Puppeteer: https://github.com/puppeteer/puppeteer/issues/3397#issuecomment-434970058
    messageParts = await Promise.all(
      message.args().map(arg =>
        arg.executionContext().evaluate(arg => {
          if (arg instanceof Error) {
            return arg.message;
          } else {
            return arg;
          }
        }, arg),
      ),
    );
  } catch {
    // Sometimes the following error occurs because console log occurs after test runner
    // has already moved onto the next test. Ignore these and show original log message
    // instead: Execution context was destroyed, most likely because of a navigation.
    messageParts = ['From a previously loaded page:', message.text()];
  }

  // In most situations `message.text()` will be used...
  const extractedText = messageParts.join(' ').trim();
  return extractedText !== '' ? extractedText : message.text();
}

export function verifyConsoleSubscription(page) {
  if (consoleSubscriptionPage === page) {
    return;
  }

  consoleSubscriptionPage = page;

  page.on('console', async message => {
    const text = await extractTextFromMessage(message);
    quietLog(`browser ${message.type()}: ${text}`, message.type());

    const { url, lineNumber, columnNumber } = message.location();
    if (!!url || !!lineNumber || !!columnNumber) {
      process.stdout.write(chalk.grey(`  ${url}:${lineNumber}:${columnNumber}\n`));
    }
  });
}
