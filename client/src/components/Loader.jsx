import React from 'react';

const Loader = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-[#181818] h-screen text-center'>
      <div className='w-[100px] h-[100px]'>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 100 100" enable-background="new 0 0 100 100" space="preserve">
          <rect fill="#404040" width="3" height="100" transform="translate(0) rotate(180 3 50)">
            <animate
              attributeName="height"
              attributeType="XML"
              dur="1s"
              values="30; 100; 30"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="17" fill="#404040" width="3" height="100" transform="translate(0) rotate(180 20 50)">
            <animate
              attributeName="height"
              attributeType="XML"
              dur="1s"
              values="30; 100; 30"
              repeatCount="indefinite"
              begin="0.1s"
            />
          </rect>
          <rect x="40" fill="#404040" width="3" height="100" transform="translate(0) rotate(180 40 50)">
            <animate
              attributeName="height"
              attributeType="XML"
              dur="1s"
              values="30; 100; 30"
              repeatCount="indefinite"
              begin="0.3s"/>
          </rect>
          <rect x="60" fill="#404040" width="3" height="100" transform="translate(0) rotate(180 58 50)">
            <animate
              attributeName="height"
              attributeType="XML"
              dur="1s"
              values="30; 100; 30"
              repeatCount="indefinite"
              begin="0.5s"/>
          </rect>
          <rect x="80" fill="#404040" width="3" height="100" transform="translate(0) rotate(180 76 50)">
            <animate
              attributeName="height"
              attributeType="XML"
              dur="1s"
              values="30; 100; 30"
              repeatCount="indefinite"
              begin="0.1s"/>
          </rect>
        </svg>
      </div>
    </div>
  )
}

export default Loader;