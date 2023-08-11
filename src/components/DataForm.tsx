import { useState } from "react";

interface Props {
  name?: string;
  age?: number;
  gender?: "female" | "male" | undefined;
  videoUploadStatus?: boolean;
  scoliosisPredictionStatus?: "a" | "b" | "c" | undefined;
  setVisibility?: (value: boolean) => void;
}

const DataForm = ({
  name,
  age,
  gender,
  videoUploadStatus,
  scoliosisPredictionStatus,
  setVisibility,
}: Props) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updateAge, setUpdateAge] = useState(age);
  const [updateGender, setUpdateGender] = useState(gender);
  const [videoUploaded, setVideoUploadStatus] = useState(videoUploadStatus);
  const [updatePrediction, setUpdatePrediction] = useState(
    scoliosisPredictionStatus
  );

  return (
    <div className="column dataform">
      <div className="row">
        <p className="label"> Name</p>
        <input
          value={updatedName ? updatedName : ""}
          onChange={(e) => {
            e.preventDefault();
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
              if (value === "female" || value === "male")
                setUpdateGender(value);
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
              if (value === "female" || value === "male")
                setUpdateGender(value);
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
          onChange={() => setVideoUploadStatus(!videoUploaded)}
        />
      </div>

      <div className="row">
        <p className="label"> Scoliosis Prediction Status</p>
        <select
          value={updatePrediction}
          onChange={(e) => {
            let value = e.target.value;
            if (value === "a" || value === "b" || value === "c")
              setUpdatePrediction(value);
          }}
        >
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>
      </div>

      <button
        onClick={() => {
          if (setVisibility) setVisibility(false);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default DataForm;
