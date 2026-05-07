import { beforeEach } from "vitest";

// jsdom does not implement HTMLDialogElement.show/showModal/close — polyfill them
if (typeof HTMLDialogElement !== "undefined") {
  if (!HTMLDialogElement.prototype.show) {
    HTMLDialogElement.prototype.show = function () {};
  }
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function () {};
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function () {};
  }
}

// Create the #app div before any screen modules are imported
if (!document.getElementById("app")) {
  const app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);
}

beforeEach(() => {
  // Clear the app div
  document.getElementById("app").innerHTML = "";
  // Clear localStorage
  localStorage.clear();
});
