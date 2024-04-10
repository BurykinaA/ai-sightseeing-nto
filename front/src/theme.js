export const modalTheme={
    "root": {
     
      "show": {
        "on": "flex bg-gray-900 bg-opacity-30 ",
        "off": "hidden"
      },
      "sizes": {
        "custom": "w-[612px]",
        "customMD": "w-[700px]",
        "customLG": "w-[800px]",
        "customSmall": "w-[361px]",
      },
      "positions": {
        "center": "items-center justify-center",
      }
    },
    "content": {
      "base": "relative h-full w-full  md:h-auto",
      "inner": "relative rounded-lg bg-white shadow "
    },
    "body": {
      "base": "px-6 pb-6 flex-1 overflow-auto",
      "popup": "pt-0"
    },
    "header": {
      "base": "flex p-6 pb-[16px] items-start justify-between rounded-t",
      "title": "text-xl font-medium text-gray-900 ",
      "close": {
        "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900",
        "icon": "h-5 w-5"
      }
    },
    "footer": {
      "base": "flex items-center space-x-2 rounded-lg border-gray-200 p-6 pt-[16px] ",
    
    }
  }