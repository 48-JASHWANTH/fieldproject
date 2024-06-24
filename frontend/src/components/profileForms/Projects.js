import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forms.css";
import { axiosWithToken } from "../../axiosWithToken";
import { useNavigate } from "react-router-dom";

const Projects = () => {
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
        "http://localhost:5000/userApi/Projects",
        data
      );
      console.log(res.status);
      if (res.status === 200) {
        localStorage.setItem("lastCompletedForm", "4");
        alert("Data saved successfully...");
        navigate("/FacultyPage/CompleteProfile/Patents");
      }
    } catch (err) {
      alert("Data has already been saved...");
    }
  }

  const handlePrev = () => {
    navigate("/FacultyPage/CompleteProfile/Publications");
  };

  const handleSkip = () => {
    localStorage.setItem("lastCompletedForm", "4");
    navigate("/FacultyPage/CompleteProfile/Patents");
  };

  return (
    <div className="container mt-5 shadow-lg p-3 mb-5 bg-white rounded">
      <h2 className="form-heading mb-4">Project Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="project_id" className="form-label">
              Project ID
            </label>
            <input
              type="text"
              {...register("project_id", { required: true })}
              className={`form-control ${
                errors.project_id ? "is-invalid" : ""
              }`}
              id="project_id"
            />
            {errors.project_id && (
              <div className="invalid-feedback">Project ID is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="project_type" className="form-label">
              Project Type
            </label>
            <select
              {...register("project_type", { required: true })}
              className={`form-control ${
                errors.project_type ? "is-invalid" : ""
              }`}
              id="project_type"
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Project Type --
              </option>
              <option value="Mini">Mini</option>
              <option value="Major">Major</option>
            </select>
            {errors.project_type && (
              <div className="invalid-feedback">Project type is required</div>
            )}
          </div>
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
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="author_ID1" className="form-label">
              Author ID1
            </label>
            <input
              type="text"
              {...register("author_ID1", { required: true })}
              className="form-control"
              id="author_ID1"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="author_ID2" className="form-label">
              Author ID2
            </label>
            <input
              type="text"
              {...register("author_ID2", { required: true })}
              className="form-control"
              id="author_ID2"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="author_ID3" className="form-label">
              Author ID3
            </label>
            <input
              type="text"
              {...register("author_ID3", { required: true })}
              className="form-control"
              id="author_ID3"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="dept" className="form-label">
              Department
            </label>
            <input
              type="text"
              {...register("dept", { required: true })}
              className={`form-control ${errors.dept ? "is-invalid" : ""}`}
              id="dept"
            />
            {errors.dept && (
              <div className="invalid-feedback">Department is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="branch" className="form-label">
              Branch
            </label>
            <input
              type="text"
              {...register("branch", { required: true })}
              className={`form-control ${errors.branch ? "is-invalid" : ""}`}
              id="branch"
            />
            {errors.branch && (
              <div className="invalid-feedback">Branch is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Foreign</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("foreign_", { required: true })}
                value="Yes"
                className="form-check-input"
                id="foreignYes"
              />
              <label className="form-check-label" htmlFor="foreignYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("foreign_", { required: true })}
                value="No"
                className="form-check-input"
                id="foreignNo"
              />
              <label className="form-check-label" htmlFor="foreignNo">
                No
              </label>
            </div>
            {errors.foreign_ && (
              <div className="invalid-feedback d-block">
                Foreign selection is required
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="proofs" className="form-label">
              Proofs
            </label>
            <input
              type="file"
              {...register("proofs", { required: true })}
              className={`form-control ${errors.proofs ? "is-invalid" : ""}`}
              id="proofs"
            />
            {errors.proofs && (
              <div className="invalid-feedback">Proofs file is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="sponsors" className="form-label">
              Sponsors
            </label>
            <input
              type="text"
              {...register("sponsors", { required: true })}
              className="form-control"
              id="sponsors"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="industry" className="form-label">
              Industry
            </label>
            <input
              type="text"
              {...register("industry", { required: true })}
              className="form-control"
              id="industry"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
            />
            {errors.title && (
              <div className="invalid-feedback">Title is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="appliedDate" className="form-label">
              Applied Date
            </label>
            <input
              type="date"
              {...register("appliedDate", { required: true })}
              className={`form-control ${
                errors.appliedDate ? "is-invalid" : ""
              }`}
              id="appliedDate"
            />
            {errors.appliedDate && (
              <div className="invalid-feedback">Applied date is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="dateofSanction" className="form-label">
              Date of Sanction
            </label>
            <input
              type="date"
              {...register("dateofSanction", { required: true })}
              className="form-control"
              id="dateofSanction"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="domain" className="form-label">
              Domain
            </label>
            <input
              type="text"
              {...register("domain", { required: true })}
              className="form-control"
              id="domain"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Student Presence</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("studentPresence", { required: true })}
                value="Yes"
                className="form-check-input"
                id="studentPresenceYes"
              />
              <label className="form-check-label" htmlFor="studentPresenceYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("studentPresence", { required: true })}
                value="No"
                className="form-check-input"
                id="studentPresenceNo"
              />
              <label className="form-check-label" htmlFor="studentPresenceNo">
                No
              </label>
            </div>
            {errors.studentPresence && (
              <div className="invalid-feedback d-block">
                Student presence selection is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Funded</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("funded", { required: true })}
                value="Yes"
                className="form-check-input"
                id="fundedYes"
              />
              <label className="form-check-label" htmlFor="fundedYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("funded", { required: true })}
                value="No"
                className="form-check-input"
                id="fundedNo"
              />
              <label className="form-check-label" htmlFor="fundedNo">
                No
              </label>
            </div>
            {errors.funded && (
              <div className="invalid-feedback d-block">Funded selection</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="fundingOrganization" className="form-label">
              Funding Organization
            </label>
            <input
              type="text"
              {...register("fundingOrganization", { required: true })}
              className="form-control"
              id="fundingOrganization"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="budget" className="form-label">
              Budget
            </label>
            <input
              type="number"
              {...register("budget", { required: true })}
              className="form-control"
              id="budget"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              {...register("status", { required: true })}
              className={`form-control ${errors.status ? "is-invalid" : ""}`}
              id="status"
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Status --
              </option>
              <option value="Rejected">Rejected</option>
              <option value="Submitted">Submitted</option>
              <option value="Approved">Approved</option>
            </select>
            {errors.status && (
              <div className="invalid-feedback">Status is required</div>
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

export default Projects;
