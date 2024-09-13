export function documentEnabledScroll() {
  document.body.style.overflowY = "visible";
  document.body.style.paddingRight = "0";
  document.body.style.setProperty("--scroll-left-padding", 0);
}

export function documentDisableScroll() {
  const scrollbar = window.innerWidth - document.body.clientWidth;
  document.body.style.setProperty("--scroll-left-padding", `${scrollbar}px`);
  document.body.style.overflowY = "hidden";
  document.body.style.paddingRight = `${scrollbar}px`;
}
