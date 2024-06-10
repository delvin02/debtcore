import './index.css'

import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import axios from 'axios'
import { createMetaManager } from 'vue-meta';

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
	FaCheck,
	FaWindowClose,
	FaBook,
	FaFileImage,
	FaAngleDown,
	FaSort,
	FaCircle,
	FaPhoneAlt,
	FaTrashAlt,
	FaCircleNotch,
	FaRegularSadCry,
	FaEdit,
	FaArrowRight,
	FaArrowLeft,
	FaChevronRight,
	FaChevronLeft,
	FaRegularFileImage,
	FaCogs,
	FaRegularCalendarAlt,
	FaSync,
	FaShareSquare,
	FaDownload,
	FaMapPin
} from 'oh-vue-icons/icons/fa/index.js'

import {
	BiGraphUpArrow,
	BiThreeDots,
	BiGear,
	BiEmojiSmileFill,
	BiCashCoin,
	BiStopwatch,
	BiArrowUpSquareFill,
	BiFileEarmarkFont,
	BiX,
	BiCheck,
	BiCalendarFill,
	BiBookmarkPlusFill,
	BiCircleFill,
	BiXSquare,
	BiCheckSquare,
	BiArrowLeftRight,
	BiWhatsapp
} from 'oh-vue-icons/icons/bi/index.js'

import { MdCancel, MdPendingactions,MdRefresh  } from 'oh-vue-icons/icons/md/index.js'

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
	BiFileEarmarkFont,
	FaCircleNotch,
	FaRegularSadCry,
	FaEdit,
	FaArrowRight,
	FaArrowLeft,
	FaChevronRight,
	FaChevronLeft,
	FaCheck,
	BiX,
	BiCheck,
	FaRegularFileImage,
	BiCalendarFill,
	FaCogs,
	FaRegularCalendarAlt,
	BiBookmarkPlusFill,
	BiCircleFill,
	BiXSquare,
	BiCheckSquare,
	FaSync,
	FaShareSquare,
	FaDownload,
	FaMapPin,
	BiArrowLeftRight,
	BiWhatsapp,
	MdRefresh 
)

// const baseURL = import.meta.env.VITE_BACKEND_URL

export const baseURL = ''
axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true

// Axios interceptor for Authorization header
axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Token ${token}`
	}
	return config
})

// Retrieve and set CSRF configuration
function retrieveCSRFConfig() {
	const drfCsrfElement = document.getElementById('drf_csrf')
	return drfCsrfElement ? JSON.parse(drfCsrfElement.textContent || '{}') : {}
}

const csrfConfig = retrieveCSRFConfig()
if (csrfConfig.csrfToken && csrfConfig.csrfHeaderName) {
	axios.defaults.headers.common[csrfConfig.csrfHeaderName] = csrfConfig.csrfToken
}

const app = createApp(App).component('VIcon', OhVueIcon)

app.use(createPinia())
app.use(router)
app.use(createMetaManager());

app.mount('#app')
