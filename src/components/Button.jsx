import React from 'react'

const Button = ({
    children,
    type= 'button',
    bgcolor = 'bg-blue-600',
    textcolcor = 'text-white',
    calssName = '',
    ...props
}) => {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgcolor}${textcolcor}${calssName}`}{...props} >
        {children}
    </button>
  )
}

export default Button