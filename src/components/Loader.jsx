import React from 'react'
import {
    Paper
}
from '@mui/material'

export default function Loader() {
  return (
    <Paper
      elevation={5} 
      style={{
          position: 'absolute',
          top: '0%',
          right: '0%',
          margin: '20px',
          padding: '10px'
      }}>Loading...
    </Paper>
  )
}
