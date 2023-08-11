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
