import { useState } from "react";

interface Props {
  setVisibility?: (value: boolean) => void;
  existingPatient?: {
    id: number;
    name: string;
    age: number;
    gender: "female" | "male";
    videoUploadStatus: boolean;
    scoliosisPredictionStatus: "a" | "b" | "c";
  };
}

const DataForm = ({ setVisibility, existingPatient }: Props) => {
  const [updatedName, setUpdatedName] = useState(
    existingPatient && existingPatient.name
  );
  const [updateAge, setUpdateAge] = useState(
    existingPatient && existingPatient.age
  );
  const [updateGender, setUpdateGender] = useState(
    existingPatient && existingPatient.gender
  );
  const [videoUploaded, setVideoUploadStatus] = useState(
    existingPatient && existingPatient.videoUploadStatus
  );
  const [updatePrediction, setUpdatePrediction] = useState(
    existingPatient && existingPatient.scoliosisPredictionStatus
  );
  const [patient, setPatient] = useState(
    existingPatient ? existingPatient : {}
  );

  let createPatientProfile = async () => {
    await fetch("http://localhost:3000/patients/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...patient, updated: new Date() }),
    });
    if (setVisibility) setVisibility(false);
  };

  const updatePatientProfile = async () => {
    await fetch(`http://localhost:3000/patients/${existingPatient.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...patient, updated: new Date() }),
    });
  };

  return (
    <div className="column dataform">
      <div className="row">
        <p className="label"> Name</p>
        <input
          value={updatedName ? updatedName : ""}
          onChange={(e) => {
            e.preventDefault();
            setPatient({ ...patient, name: e.target.value });
            setUpdatedName(e.target.value);
          }}
        />
      </div>

      <div className="row">
        <p className="label"> Age</p>
        <input
          min={0}
          value={typeof updateAge === "number" ? updateAge : ""}
          type="number"
          onChange={(e) => {
            e.preventDefault();
            setPatient({ ...patient, age: parseInt(e.target.value) });
            setUpdateAge(parseInt(e.target.value));
          }}
        />
      </div>

      <div className="row">
        <p className="label"> Gender</p>
        <label>
          <input
            type="radio"
            value="female"
            onChange={(e) => {
              let value = e.target.value;
              if (value === "female" || value === "male") {
                setPatient({ ...patient, gender: value });
                setUpdateGender(value);
              }
            }}
            checked={updateGender === "female"}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            value="male"
            onChange={(e) => {
              let value = e.target.value;
              if (value === "female" || value === "male") {
                setPatient({ ...patient, gender: value });
                setUpdateGender(value);
              }
            }}
            checked={updateGender === "male"}
          />
          Male
        </label>
      </div>

      <div className="row">
        <p className="label"> Video Upload Status</p>
        <input
          type="checkbox"
          name="myCheckbox"
          defaultChecked={videoUploaded}
          onChange={() => {
            setPatient({ ...patient, videoUploadStatus: !videoUploaded });
            setVideoUploadStatus(!videoUploaded);
          }}
        />
      </div>

      <div className="row">
        <p className="label"> Scoliosis Prediction Status</p>
        <select
          value={updatePrediction}
          onChange={(e) => {
            let value = e.target.value;
            if (value === "a" || value === "b" || value === "c") {
              setPatient({ ...patient, scoliosisPredictionStatus: value });
              setUpdatePrediction(value);
            }
          }}
        >
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>
      </div>

      <button
        onClick={() => {
          if (patient.hasOwnProperty("id")) {
            updatePatientProfile();
          } else {
            if (
              patient.hasOwnProperty("name") &&
              patient.hasOwnProperty("age") &&
              patient.hasOwnProperty("gender") &&
              patient.hasOwnProperty("videoUploadStatus") &&
              patient.hasOwnProperty("scoliosisPredictionStatus")
            ) {
              createPatientProfile();
            } else {
              if (!patient.hasOwnProperty("name")) {
                alert("Patient form requires a name attribute");
              }
              if (!patient.hasOwnProperty("age")) {
                alert("Patient form requires an age attribute");
              }
              if (!patient.hasOwnProperty("gender")) {
                alert("Patient form requires a gender attribute");
              }
              if (!patient.hasOwnProperty("videoUploadStatus")) {
                alert("Patient form requires a video upload status attribute");
              }
              if (!patient.hasOwnProperty("scoliosisPredictionStatus")) {
                alert(
                  "Patient form requires a scoliosis prediction status attribute"
                );
              }
            }
          }
        }}
      >
        Save
      </button>
    </div>
  );
};

export default DataForm;
