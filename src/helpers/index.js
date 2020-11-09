// resize textarea html element on change
export const reSizeTextArea = el => {
  if (el.current !== undefined) {
    el.current.style.height = 'inherit'
    let newHeight = el.current.scrollHeight * 1.1
    el.current.style.height = `${newHeight}px`
  }
}
