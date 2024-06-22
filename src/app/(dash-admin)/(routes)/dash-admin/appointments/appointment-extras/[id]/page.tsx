import React from 'react'

interface Props {
  params: {
    id: string;
  }
}

export default function DetailAppointmentsExtras({ params }: Props) {


  return (
    <div>{params.id}</div>
  )
}
