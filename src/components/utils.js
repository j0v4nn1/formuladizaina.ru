import {messenger, root, tinkoffBanner} from "./variables";
import {scrollWidth} from "../pages";



export const lockScroll = () => {
  root.classList.add("root_scroll_disabled")
  root.style.paddingRight = scrollWidth
  tinkoffBanner.style.marginRight = scrollWidth
  tinkoffBanner.style.width = `calc(100% - ${scrollWidth})`
  messenger.style.paddingRight = scrollWidth
}

export const unlockScroll = () => {
  setTimeout(() => {
    root.classList.remove("root_scroll_disabled")
    root.style.paddingRight = "0"
    tinkoffBanner.style.width = '100%'
    messenger.style.paddingRight = "0"
  }, 200)
}
