// import { useState, useEffect } from 'react'

// function Result() {

//   const [data, setData] = useState({});

//   useEffect(() => {
//     fetch('/api/data').then(
//       res => res.json())
//       .then(
//         data => {
//           setData(data);
//           console.log(data)
//         }
//       )
//   }, []);

//   return (
//     <>
//     </>
//   )
// }

// export default Result

import React, { useState, useEffect } from 'react';

function Result() {

  const [info, setInfo] = useState('')
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/hello')
      .then(res => res.json()
      .then(data => {
        console.log(data)
        setInfo(data.message)
      }),
    )
  }, []);

  return (
  <>
    <p>Message from api: {info}</p>
  </>)
}

export default Result;