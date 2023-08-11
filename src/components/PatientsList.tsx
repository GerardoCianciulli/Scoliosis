import { useState, useEffect } from "react";
import PatientProfile from "./PatientProfile";
import DataForm from "./DataForm";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    getPatients();
  }, []);

  let getPatients = async () => {
    let response = await fetch("http://localhost:3000/patients");
    let data = await response.json();
    setPatients(data);
  };

  // let createProfile = async () => {
  //   await fetch("http://localhost:3000/patients", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ...newPatient, updated: new Date() }),
  //   });

  //   setNewPatient({});
  // };

  return (
    <>
      <div id="header">
        <h1>Patients List</h1>
        <button
          onClick={() => {
            setModalVisibility(true);
          }}
        >
          Create New Profile
        </button>
      </div>
      {patients.map((patient, index) => (
        <PatientProfile key={index} props={patient} />
      ))}
      {modalVisibility && (
        <div>
          <div id="modal">
            <DataForm setVisibility={setModalVisibility} />
          </div>
        </div>
      )}
    </>
  );
};

export default PatientsList;
