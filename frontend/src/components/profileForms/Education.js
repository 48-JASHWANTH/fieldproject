import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forms.css";
import { axiosWithToken } from "../../axiosWithToken";
import { useNavigate } from "react-router-dom";

const Education = () => {
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
    let res = await axiosWithToken.post(
      "http://localhost:5000/userApi/Education",
      data
    );
    console.log(res.status);
    if (res.status === 200) {
      navigate("/FacultyPage/CompleteProfile/Publications");
    }
  }

  const handlePrev = () => {
    navigate("/FacultyPage/CompleteProfile/PreviousStep");
  };

  return (
    <div className="container mt-5 shadow-lg p-3 mb-5 bg-white rounded">
      <h2 className="form-heading mb-4">Education Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_id" className="form-label">
              Faculty ID
            </label>
            <input
              type="text"
              {...register("faculty_id", { required: true })}
              className={`form-control ${errors.faculty_id ? "is-invalid" : ""}`}
              id="faculty_id"
            />
            {errors.faculty_id && (
              <div className="invalid-feedback">Faculty ID is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_10thSchoolName" className="form-label">
              10th School Name
            </label>
            <input
              type="text"
              {...register("faculty_10thSchoolName", { required: true })}
              className={`form-control ${errors.faculty_10thSchoolName ? "is-invalid" : ""}`}
              id="faculty_10thSchoolName"
            />
            {errors.faculty_10thSchoolName && (
              <div className="invalid-feedback">10th School Name is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_10thDateOfPassing" className="form-label">
              10th Date of Passing
            </label>
            <input
              type="date"
              {...register("faculty_10thDateOfPassing", { required: true })}
              className={`form-control ${errors.faculty_10thDateOfPassing ? "is-invalid" : ""}`}
              id="faculty_10thDateOfPassing"
            />
            {errors.faculty_10thDateOfPassing && (
              <div className="invalid-feedback">10th Date of Passing is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_10thPercentage" className="form-label">
              10th Percentage
            </label>
            <input
              type="number"
              step="0.01"
              {...register("faculty_10thPercentage", { required: true })}
              className={`form-control ${errors.faculty_10thPercentage ? "is-invalid" : ""}`}
              id="faculty_10thPercentage"
            />
            {errors.faculty_10thPercentage && (
              <div className="invalid-feedback">10th Percentage is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_10thBoard" className="form-label">
              10th Board
            </label>
            <input
              type="text"
              {...register("faculty_10thBoard", { required: true })}
              className={`form-control ${errors.faculty_10thBoard ? "is-invalid" : ""}`}
              id="faculty_10thBoard"
            />
            {errors.faculty_10thBoard && (
              <div className="invalid-feedback">10th Board is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_10thMaxMarks" className="form-label">
              10th Max Marks
            </label>
            <input
              type="number"
              {...register("faculty_10thMaxMarks", { required: true })}
              className={`form-control ${errors.faculty_10thMaxMarks ? "is-invalid" : ""}`}
              id="faculty_10thMaxMarks"
            />
            {errors.faculty_10thMaxMarks && (
              <div className="invalid-feedback">10th Max Marks is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_10thObtainedMarks" className="form-label">
              10th Obtained Marks
            </label>
            <input
              type="number"
              {...register("faculty_10thObtainedMarks", { required: true })}
              className={`form-control ${errors.faculty_10thObtainedMarks ? "is-invalid" : ""}`}
              id="faculty_10thObtainedMarks"
            />
            {errors.faculty_10thObtainedMarks && (
              <div className="invalid-feedback">10th Obtained Marks is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_10thHallTicketNumber" className="form-label">
              10th Hall Ticket Number
            </label>
            <input
              type="text"
              {...register("faculty_10thHallTicketNumber", { required: true })}
              className={`form-control ${errors.faculty_10thHallTicketNumber ? "is-invalid" : ""}`}
              id="faculty_10thHallTicketNumber"
            />
            {errors.faculty_10thHallTicketNumber && (
              <div className="invalid-feedback">10th Hall Ticket Number is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_10thSchoolAddress" className="form-label">
              10th School Address
            </label>
            <input
              type="text"
              {...register("faculty_10thSchoolAddress", { required: true })}
              className={`form-control ${errors.faculty_10thSchoolAddress ? "is-invalid" : ""}`}
              id="faculty_10thSchoolAddress"
            />
            {errors.faculty_10thSchoolAddress && (
              <div className="invalid-feedback">10th School Address is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_interCollegelName" className="form-label">
              Intermediate College Name
            </label>
            <input
              type="text"
              {...register("faculty_interCollegelName", { required: true })}
              className={`form-control ${errors.faculty_interCollegelName ? "is-invalid" : ""}`}
              id="faculty_interCollegelName"
            />
            {errors.faculty_interCollegelName && (
              <div className="invalid-feedback">Intermediate College Name is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_interYearOfPassing" className="form-label">
              Intermediate Year of Passing
            </label>
            <input
              type="date"
              {...register("faculty_interYearOfPassing", { required: true })}
              className={`form-control ${errors.faculty_interYearOfPassing ? "is-invalid" : ""}`}
              id="faculty_interYearOfPassing"
            />
            {errors.faculty_interYearOfPassing && (
              <div className="invalid-feedback">Intermediate Year of Passing is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_interPercintage" className="form-label">
              Intermediate Percentage
            </label>
            <input
              type="number"
              step="0.01"
              {...register("faculty_interPercintage", { required: true })}
              className={`form-control ${errors.faculty_interPercintage ? "is-invalid" : ""}`}
              id="faculty_interPercintage"
            />
            {errors.faculty_interPercintage && (
              <div className="invalid-feedback">Intermediate Percentage is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_interBoard" className="form-label">
              Intermediate Board
            </label>
            <input
              type="text"
              {...register("faculty_interBoard", { required: true })}
              className={`form-control ${errors.faculty_interBoard ? "is-invalid" : ""}`}
              id="faculty_interBoard"
            />
            {errors.faculty_interBoard && (
              <div className="invalid-feedback">Intermediate Board is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_degreeType" className="form-label">
              Degree Type
            </label>
            <input
              type="text"
              {...register("faculty_degreeType", { required: true })}
              className={`form-control ${errors.faculty_degreeType ? "is-invalid" : ""}`}
              id="faculty_degreeType"
            />
            {errors.faculty_degreeType && (
              <div className="invalid-feedback">Degree Type is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_degreeSchoolName" className="form-label">
              Degree School Name
            </label>
            <input
              type="text"
              {...register("faculty_degreeSchoolName", { required: true })}
              className={`form-control ${errors.faculty_degreeSchoolName ? "is-invalid" : ""}`}
              id="faculty_degreeSchoolName"
            />
            {errors.faculty_degreeSchoolName && (
              <div className="invalid-feedback">Degree School Name is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_degreeyearOfPassing" className="form-label">
              Degree Year of Passing
            </label>
            <input
              type="date"
              {...register("faculty_degreeyearOfPassing", { required: true })}
              className={`form-control ${errors.faculty_degreeyearOfPassing ? "is-invalid" : ""}`}
              id="faculty_degreeyearOfPassing"
            />
            {errors.faculty_degreeyearOfPassing && (
              <div className="invalid-feedback">Degree Year of Passing is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_degreePercentage" className="form-label">
              Degree Percentage
            </label>
            <input
              type="number"
              step="0.01"
              {...register("faculty_degreePercentage", { required: true })}
              className={`form-control ${errors.faculty_degreePercentage ? "is-invalid" : ""}`}
              id="faculty_degreePercentage"
            />
            {errors.faculty_degreePercentage && (
              <div className="invalid-feedback">Degree Percentage is required</div>
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
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Education;
