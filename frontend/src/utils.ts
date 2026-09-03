export async function handleVisitButton(url: string) {
  window.location.href = `${url}`;
}

export async function handleCopyUrlButton(url: string) {
  try {
    await navigator.clipboard.writeText(url);
  } catch (error) {
    console.error("Failed to copy: ", error);
  }
}
