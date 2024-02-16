export default function toast({ type, text }) {
  const event = new CustomEvent('addToast', {
    detail: {
      type,
      text,
    },
  });

  document.dispatchEvent(event);
}
