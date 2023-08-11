import Canvas from "./Canvas";
import DataForm from "./DataForm";

interface Props {
  props: any;
}

const PatientProfile = ({ props }: Props) => {
  return (
    <div className="patient-profile">
      <Canvas id={props.id} pointCloudData={props.pointCloudData} />
      <DataForm
        name={props.name}
        age={props.age}
        gender={props.gender}
        videoUploadStatus={props.videoUploadStatus}
        scoliosisPredictionStatus={props.scoliosisPredictionStatus}
      />
    </div>
  );
};

export default PatientProfile;
