import DatePicking from "./DatePicking";

const FormDate = ({ name, label, size }) => {
  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>

      <DatePicking name={name} />
    </div>
  );
};
export default FormDate;
