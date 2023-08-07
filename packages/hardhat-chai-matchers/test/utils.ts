export const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export async function waitUntil(
  f: () => boolean | Promise<boolean>,
  errorMessage: string
) {
  const maxTries = 20;
  let tries = 0;
  while (tries < maxTries) {
    const result = await f();

    if (result) {
      break;
    }

    await sleep(50);

    tries++;
  }

  throw new Error(errorMessage);
}
