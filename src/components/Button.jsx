import React from 'react'

function Button({label, onclick}) {
  return (
    <div>
      <button
        className='py-2 text-white text-center rounded-md bg-primary hover:bg-blue-700 lg:w-96'
      >
        {label}
      </button>
    </div>
  )
}

export default Button
