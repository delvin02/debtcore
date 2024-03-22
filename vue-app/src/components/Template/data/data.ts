// import { h } from 'vue'
// import ArrowDownIcon from '~icons/radix-icons/arrow-down'
// import ArrowRightIcon from '~icons/radix-icons/arrow-right'
// import ArrowUpIcon from '~icons/radix-icons/arrow-up'
// import CheckCircledIcon from '~icons/radix-icons/check-circled'
// import CircleIcon from '~icons/radix-icons/circle'
// import CrossCircledIcon from '~icons/radix-icons/cross-circled'
// import QuestionMarkCircledIcon from '~icons/radix-icons/question-mark-circled'
// import StopwatchIcon from '~icons/radix-icons/stopwatch'


export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'draft',
    label: 'Draft',
    icon: 'fa-pen',
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: 'bi-gear',
    animation: 'spin'
  },
  {
    value: 'active',
    label: 'Active',
    icon: 'fa-check-circle',
  },
  {
    value: 'failed',
    label: 'Failed',
    icon: 'fa-window-close',
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    //icon: h(ArrowDownIcon),
  },
  {
    label: 'Medium',
    value: 'medium',
    //icon: h(ArrowRightIcon),
  },
  {
    label: 'High',
    value: 'high',
   // icon: h(ArrowUpIcon),
  },
]

export const types = [
  {
    label: 'Marketing',
    value: 'marketing'
  },
  {
    label: 'Utility',
    value: "utility"
  },
  {
    label: 'Authentication',
    value: 'authentication'
  }
]