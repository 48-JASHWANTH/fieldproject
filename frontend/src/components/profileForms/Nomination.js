import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forms.css";
import { axiosWithToken } from "../../axiosWithToken";
import { useNavigate } from "react-router-dom";

const Nomination = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const formValues = watch();

  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      for (const key in parsedFormData) {
        setValue(key, parsedFormData[key]);
      }
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formValues));
  }, [formValues]);

  async function onSubmit(data) {
    console.log(data);
    try {
      let res = await axiosWithToken.post(
        "http://localhost:5000/userApi/Nomination",
        data
      );
      console.log(res.status);
      if (res.status === 200) {
        localStorage.setItem("lastCompletedForm", "6");
        alert("Data saved successfully...");
        navigate("/FacultyPage/CompleteProfile/Authors");
      }
    } catch (err) {
      alert("Data has already been saved...");
    }
  }

  const handleSkip = () => {
    localStorage.setItem("lastCompletedForm", "6");
    navigate("/FacultyPage/CompleteProfile/Authors");
  };

  const handlePrev = () => {
    navigate("/FacultyPage/CompleteProfile/Patents");
  };

  return (
    <div className="container mt-5 shadow-lg p-3 mb-5 bg-white rounded">
      <h2 className="form-heading mb-4">Nominee Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_id" className="form-label">
              Faculty ID
            </label>
            <input
              type="text"
              {...register("faculty_id", { required: true })}
              className={`form-control ${
                errors.faculty_id ? "is-invalid" : ""
              }`}
              id="faculty_id"
            />
            {errors.faculty_id && (
              <div className="invalid-feedback">Faculty ID is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="nomine_name" className="form-label">
              Nominee Name
            </label>
            <input
              type="text"
              {...register("nomine_name", { required: true })}
              className={`form-control ${
                errors.nomine_name ? "is-invalid" : ""
              }`}
              id="nomine_name"
            />
            {errors.nomine_name && (
              <div className="invalid-feedback">Nominee Name is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="nomine_relation" className="form-label">
              Nominee Relation
            </label>
            <input
              type="text"
              {...register("nomine_relation", { required: true })}
              className={`form-control ${
                errors.nomine_relation ? "is-invalid" : ""
              }`}
              id="nomine_relation"
            />
            {errors.nomine_relation && (
              <div className="invalid-feedback">
                Nominee Relation is required
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="nomine_percentage" className="form-label">
              Nominee Percentage
            </label>
            <input
              type="number"
              {...register("nomine_percentage", { required: true })}
              className={`form-control ${
                errors.nomine_percentage ? "is-invalid" : ""
              }`}
              id="nomine_percentage"
            />
            {errors.nomine_percentage && (
              <div className="invalid-feedback">
                Nominee Percentage is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="nomine_dateOfBirth" className="form-label">
              Nominee Date of Birth
            </label>
            <input
              type="date"
              {...register("nomine_dateOfBirth", { required: true })}
              className={`form-control ${
                errors.nomine_dateOfBirth ? "is-invalid" : ""
              }`}
              id="nomine_dateOfBirth"
            />
            {errors.nomine_dateOfBirth && (
              <div className="invalid-feedback">
                Nominee Date of Birth is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label
              htmlFor="nomine_contiguencyOfHappening"
              className="form-label"
            >
              Contingency of Happening
            </label>
            <input
              type="text"
              {...register("nomine_contiguencyOfHappening", { required: true })}
              className={`form-control ${
                errors.nomine_contiguencyOfHappening ? "is-invalid" : ""
              }`}
              id="nomine_contiguencyOfHappening"
            />
            {errors.nomine_contiguencyOfHappening && (
              <div className="invalid-feedback">
                Contingency of Happening is required
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="nomine_address" className="form-label">
              Nominee Address
            </label>
            <input
              type="text"
              {...register("nomine_address", { required: true })}
              className={`form-control ${
                errors.nomine_address ? "is-invalid" : ""
              }`}
              id="nomine_address"
            />
            {errors.nomine_address && (
              <div className="invalid-feedback">
                Nominee Address is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="nomine_remarks" className="form-label">
              Nominee Remarks
            </label>
            <input
              type="text"
              {...register("nomine_remarks", { required: true })}
              className={`form-control ${
                errors.nomine_remarks ? "is-invalid" : ""
              }`}
              id="nomine_remarks"
            />
            {errors.nomine_remarks && (
              <div className="invalid-feedback">
                Nominee Remarks is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="nomine_aadharNumber" className="form-label">
              Nominee Aadhar Number
            </label>
            <input
              type="text"
              {...register("nomine_aadharNumber", { required: true })}
              className={`form-control ${
                errors.nomine_aadharNumber ? "is-invalid" : ""
              }`}
              id="nomine_aadharNumber"
            />
            {errors.nomine_aadharNumber && (
              <div className="invalid-feedback">
                Nominee Aadhar Number is required
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="nomine_id" className="form-label">
              Nominee ID
            </label>
            <input
              type="text"
              {...register("nomine_id", { required: true })}
              className={`form-control ${errors.nomine_id ? "is-invalid" : ""}`}
              id="nomine_id"
            />
            {errors.nomine_id && (
              <div className="invalid-feedback">Nominee ID is required</div>
            )}
          </div>
        </div>

        <div className="nav-buttons d-flex justify-content-between">
          <button
            type="button"
            onClick={handlePrev}
            className="btn btn-success"
          >
            Prev
          </button>
          <button type="submit" className="btn btn-success">
            Save & Next
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="btn btn-success"
          >
            Skip
          </button>
        </div>
      </form>
    </div>
  );
};

export default Nomination;
