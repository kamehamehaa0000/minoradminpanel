import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const StaffComponent = () => {
  const [staffMembers, setStaffMembers] = useState([])
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [shift, setShift] = useState('')
  const [dateOfJoining, setDateOfJoining] = useState('')
  const [selectedStaffId, setSelectedStaffId] = useState(null)
  const [cookies] = useCookies(['authToken'])
  const ApiURL = import.meta.env.VITE_APIURL

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await axios.get(`${ApiURL}/staff/getall`, {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        })
        console.log(response)
        setStaffMembers(response.data.data)
      } catch (error) {
        console.error('Error fetching staff members:', error)
      }
    }
    fetchStaffMembers()
  }, [])

  const handleAddStaffMember = async () => {
    try {
      await axios.post(
        `${ApiURL}/staff/add`,
        { name, role, phoneNumber, shift, dateOfJoining },
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      )
      // Refresh the staff list after adding a member
      const response = await axios.get(`${ApiURL}/staff/getall`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      setStaffMembers(response.data.data)
      // Clear the input fields
      setName('')
      setRole('')
      setPhoneNumber('')
      setShift('')
      setDateOfJoining('')
    } catch (error) {
      console.error('Error adding staff member:', error)
    }
  }

  const handleDeleteStaffMember = async (staffId) => {
    try {
      await axios.delete(`${ApiURL}/staff/delete/${staffId}`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      // Remove the deleted staff member from the list
      setStaffMembers(staffMembers.filter((member) => member._id !== staffId))
    } catch (error) {
      console.error('Error deleting staff member:', error)
    }
  }

  const handleUpdateStaffMember = async () => {
    try {
      await axios.put(
        `${ApiURL}/staff/update/${selectedStaffId}`,
        { name, role, phoneNumber, shift, dateOfJoining },
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      )
      // Refresh the staff list after updating a member
      const response = await axios.get(`${ApiURL}/staff/getall`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      setStaffMembers(response.data.data)
      // Clear the input fields and reset selected staff ID
      setName('')
      setRole('')
      setPhoneNumber('')
      setShift('')
      setDateOfJoining('')
      setSelectedStaffId(null)
    } catch (error) {
      console.error('Error updating staff member:', error)
    }
  }

  const handleSelectStaffMember = (staffId) => {
    const selectedMember = staffMembers.find((member) => member._id === staffId)
    if (selectedMember) {
      setSelectedStaffId(staffId)
      setName(selectedMember.name)
      setRole(selectedMember.role)
      setPhoneNumber(selectedMember.phoneNumber)
      setShift(selectedMember.shift)
      setDateOfJoining(selectedMember.dateOfJoining)
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Staff Members</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Add/Update Staff Member:</h2>
        <div className="flex flex-col md:flex-row md:items-center">
          <input
            type="text"
            className="border border-gray-400 px-4 py-2 rounded-lg mb-2 md:mr-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-400 px-4 py-2 rounded-lg mb-2 md:mr-2"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-400 px-4 py-2 rounded-lg mb-2 md:mr-2"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-400 px-4 py-2 rounded-lg mb-2 md:mr-2"
            placeholder="Shift"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-400 px-4 py-2 rounded-lg mb-2 md:mr-2"
            placeholder="Date of Joining"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
          />
          {selectedStaffId ? (
            <button
              className="px-4 py-2 bg-green-500 mb-2 text-white rounded-md"
              onClick={handleUpdateStaffMember}
            >
              Update
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 mb-2 text-white rounded-md"
              onClick={handleAddStaffMember}
            >
              Add
            </button>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Staff List:</h2>
        <div className="w-full sm:w-1/2">
          {staffMembers.map((member) => (
            <li key={member._id} className="mb-2 grid grid-cols-2">
              <h1 className="col-span-1 flex items-center">
                {member.name} - {member.role} - {member.phoneNumber} -{' '}
                {member.shift} - {member.dateOfJoining}
              </h1>
              <div className="flex col-span-1">
                <button
                  className="px-4  py-2 bg-red-500 text-white rounded-md ml-2"
                  onClick={() => handleDeleteStaffMember(member._id)}
                >
                  Delete
                </button>
                <button
                  className="px-4  py-2 bg-blue-500 text-white rounded-md ml-2"
                  onClick={() => handleSelectStaffMember(member._id)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StaffComponent
