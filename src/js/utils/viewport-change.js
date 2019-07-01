import { AddTick } from 'tick-manager';
import { GetViewportDetails } from 'viewport-details';

const callbacks = [];
let running = false;

export default function onViewportChange(callback) {
  callbacks.push(callback);

  if (!running) {
    running = true;
    AddTick(tick);
  }
}

function tick() {
  const viewportDetails = GetViewportDetails();

  if (viewportDetails.resized) {
    callbacks.forEach(callback => callback(viewportDetails));
  }
}
