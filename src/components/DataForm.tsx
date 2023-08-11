import { useState } from "react";

interface Props {
  setVisibility?: (value: boolean) => void;
  existingPatient: {
    id?: number;
    name?: string;
    age?: number;
    gender?: "female" | "male";
    videoUploadStatus?: boolean;
    scoliosisPredictionStatus?: "a" | "b" | "c";
  };
}

const DataForm = ({ setVisibility, existingPatient }: Props) => {
  const [updatedName, setUpdatedName] = useState(existingPatient.name);
  const [updateAge, setUpdateAge] = useState(existingPatient.age);
  const [updateGender, setUpdateGender] = useState(existingPatient.gender);
  const [videoUploaded, setVideoUploadStatus] = useState(
    existingPatient.videoUploadStatus
  );
  const [updatePrediction, setUpdatePrediction] = useState(
    existingPatient.scoliosisPredictionStatus
  );
  const [patient, setPatient] = useState(existingPatient);

  const updatePatient = async () => {
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
          if (setVisibility) {
            console.log("patient", patient);
            setVisibility(false);
          } else {
            updatePatient();
          }
        }}
      >
        Save
      </button>
    </div>
  );
};

export default DataForm;
