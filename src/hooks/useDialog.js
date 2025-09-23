export const closeDialog = () => {
  document.querySelector('[data-slot="dialog-close"]')?.click();
};
export const closeAlertDialog = () => {
  document.querySelector('[data-slot="alert-dialog-close"]')?.click();
};

export const openDialog = (id) => {
  console.log(id);
  document.querySelector(`#${id}`)?.click();
}
