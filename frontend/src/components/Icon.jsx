const paths = {
  activity: <><path d="M3 12h4l2.2-7 4.1 14 2.2-7H21" /></>,
  bowl: <><path d="M4 11h16a8 8 0 0 1-16 0Z" /><path d="M8 7c0-1.2 1-2 2-2 0-1.2.9-2 2-2s2 .8 2 2c1 0 2 .8 2 2" /><path d="M8 21h8" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  chevronDown: <><path d="m6 9 6 6 6-6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  dishes: <><path d="M6 3v7M9 3v7M3 3v4a3 3 0 0 0 6 0M6 10v11M17 3c-2 2-3 5-3 8h5V3h-2ZM19 11v10" /></>,
  eyeOff: <><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.2A10.8 10.8 0 0 1 12 4c5.5 0 9 6 9 6a16 16 0 0 1-2.1 2.8M6.2 6.2C4.2 7.5 3 10 3 10s3.5 6 9 6a9.8 9.8 0 0 0 3-.5" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  wifi: <><path d="M4 9a12 12 0 0 1 16 0M7 12a7.5 7.5 0 0 1 10 0M10 15a3 3 0 0 1 4 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></>,
}

export default function Icon({ name, size = 20, className = '', strokeWidth = 1.8 }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      {paths[name]}
    </svg>
  )
}
