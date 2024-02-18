import EventManager from '../lib/EventManger';

export const toastEventManager = new EventManager();

export default function toast({ type, text }) {
  toastEventManager.emit('addToast', { type, text });
}
