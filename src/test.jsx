import React from 'react'
import './test.css'

export default function Test() {
  return (
    <>
    <table>
  <thead>
    <tr>
      <th>JOB ID</th>
      <th>CUSTOMER NAME</th>
      <th>AMOUNT DUE</th>
      <th>PAYMENT STATUS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>42235</td>
      <td>John Doe</td>
      <td>$350</td>
      <td>Pending</td>
    </tr>
    <tr>
      <td>42442</td>
      <td>Jennifer Smith</td>
      <td>$220</td>
      <td>Pending</td>
    </tr>
    <tr>
      <td>42527</td>
      <td>John Smith</td>
      <td>$341</td>
      <td>Pending</td>
    </tr>
    <tr>
      <td>42311</td>
      <td>John Carpenter</td>
      <td>$115</td>
      <td>Pending</td>
    </tr>
  </tbody>
</table>


    </>
  )
}
