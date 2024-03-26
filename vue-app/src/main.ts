import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from '@/router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  FaExclamationTriangle,
  FaSyncAlt,
  FaSave,
  FaTimesCircle,
  FaRegularEye,
  FaRegularEyeSlash,
  FaHome,
  FaWhatsapp,
  FaPaperclip,
  FaPlug,
  FaUserAlt,
  FaBuilding,
  FaAddressBook,
  FaSignOutAlt,
  FaLock,
  FaBars,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
  FaFilter,
  FaPlusCircle,
  FaPen,
  FaCheckCircle,
  FaWindowClose,
  FaBook,
  FaFileImage,
  FaAngleDown,
  FaSort,
  FaCircle,
  FaPhoneAlt,
  FaTrashAlt 
} from 'oh-vue-icons/icons/fa/index.js'

import { 
  BiGraphUpArrow,
  BiThreeDots,
  BiGear,
  BiEmojiSmileFill,
  BiCashCoin,
  BiStopwatch,
  BiArrowUpSquareFill,
  BiFileEarmarkFont 
 } from "oh-vue-icons/icons/bi/index.js";

 import { MdCancel, MdPendingactions  } from "oh-vue-icons/icons/md/index.js";


addIcons(
  FaExclamationTriangle,
  FaSyncAlt,
  FaSave,
  FaTimesCircle,
  FaRegularEye,
  FaRegularEyeSlash,
  FaHome,
  FaWhatsapp,
  FaPaperclip,
  FaPlug,
  FaUserAlt,
  FaBuilding,
  BiGraphUpArrow,
  FaAddressBook,
  FaSignOutAlt,
  FaLock,
  FaBars,
  FaPlus,
  BiThreeDots,
  FaFilter,
  FaPlusCircle,
  FaPen,
  FaCheckCircle,
  BiGear,
  FaWindowClose,
  FaBook,
  FaFileImage,
  BiEmojiSmileFill,
  FaAngleDown,
  BiCashCoin,
  FaArrowUp,
  FaArrowDown,
  FaSort,
  MdCancel,
  MdPendingactions,
  BiStopwatch,
  FaCircle,
  BiArrowUpSquareFill,
  FaPhoneAlt,
  FaTrashAlt,
  BiFileEarmarkFont 
)

// const Fa = Object.values({ ...FaIcons });
const app = createApp(App)

.component('VIcon', OhVueIcon)

app.use(createPinia())
app.use(router)
app.mount('#app')
