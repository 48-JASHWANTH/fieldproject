import React from "react";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css'

const Patents = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container  mt-5 shadow-lg p-3 mb-5 bg-white rounded">
      <h2 className="form-heading mb-4">Patent Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-4 ">
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="patentId" className="form-label">
              Patent ID
            </label>
            <input
              type="text"
              {...register("patentId", { required: true })}
              className={`form-control ${errors.patentId ? "is-invalid" : ""}`}
              id="patentId"
            />
            {errors.patentId && (
              <div className="invalid-feedback">Patent ID is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_name" className="form-label">
              Faculty Name
            </label>
            <input
              type="text"
              {...register("faculty_name", { required: true })}
              className={`form-control ${
                errors.faculty_name ? "is-invalid" : ""
              }`}
              id="faculty_name"
            />
            {errors.faculty_name && (
              <div className="invalid-feedback">Faculty Name is required</div>
            )}
          </div>
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
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Designation</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("designation", { required: true })}
                value="Assistant"
                className="form-check-input"
                id="assistant"
              />
              <label htmlFor="assistant" className="form-check-label">
                Assistant
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("designation", { required: true })}
                value="Associate"
                className="form-check-input"
                id="associate"
              />
              <label htmlFor="associate" className="form-check-label">
                Associate
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("designation", { required: true })}
                value="Professor"
                className="form-check-input"
                id="professor"
              />
              <label htmlFor="professor" className="form-check-label">
                Professor
              </label>
            </div>
            {errors.designation && (
              <div className="invalid-feedback">Designation is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="dept" className="form-label">
              Department
            </label>
            <select
              {...register("dept", { required: true })}
              className={`form-select ${errors.dept ? "is-invalid" : ""}`}
              id="dept"
            >
              <option value="">Select Department</option>
              {/* Add department options here */}
            </select>
            {errors.dept && (
              <div className="invalid-feedback">Department is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="patentType" className="form-label">
              Patent Type
            </label>
            <input
              type="text"
              {...register("patentType", { required: true })}
              className={`form-control ${
                errors.patentType ? "is-invalid" : ""
              }`}
              id="patentType"
            />
            {errors.patentType && (
              <div className="invalid-feedback">Patent Type is required</div>
            )}
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
            <label htmlFor="author_ID1" className="form-label">
              Author ID1
            </label>
            <input
              type="text"
              {...register("author_ID1", { required: true })}
              className={`form-control ${errors.authorId1 ? "is-invalid" : ""}`}
              id="author_ID1"
            />
            {errors.author_ID1 && (
              <div className="invalid-feedback">Author ID1 is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_ID2" className="form-label">
              Author ID2
            </label>
            <input
              type="text"
              {...register("author_ID2", { required: true })}
              className={`form-control ${errors.authorId2 ? "is-invalid" : ""}`}
              id="author_ID2"
            />
            {errors.author_ID2 && (
              <div className="invalid-feedback">Author ID2 is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="author_ID3" className="form-label">
              Author ID3
            </label>
            <input
              type="text"
              {...register("author_ID3", { required: true })}
              className={`form-control ${errors.author_ID3 ? "is-invalid" : ""}`}
              id="author_ID3"
            />
            {errors.author_ID3 && (
              <div className="invalid-feedback">Author ID3 is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_ID4" className="form-label">
              Author ID4
            </label>
            <input
              type="text"
              {...register("author_ID4", { required: true })}
              className={`form-control ${errors.authorId4 ? "is-invalid" : ""}`}
              id="author_ID4"
            />
            {errors.author_ID4 && (
              <div className="invalid-feedback">Author ID4 is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_ID5" className="form-label">
              Author ID5
            </label>
            <input
              type="text"
              {...register("author_ID5", { required: true })}
              className={`form-control ${errors.authorId5 ? "is-invalid" : ""}`}
              id="author_ID5"
            />
            {errors.author_ID5 && (
              <div className="invalid-feedback">Author ID5 is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="author_ID6" className="form-label">
              Author ID6
            </label>
            <input
              type="text"
              {...register("author_ID6", { required: true })}
              className={`form-control ${errors.author_ID6 ? "is-invalid" : ""}`}
              id="author_ID6"
            />
            {errors.author_ID6 && (
              <div className="invalid-feedback">Author ID6 is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_ID7" className="form-label">
              Author ID7
            </label>
            <input
              type="text"
              {...register("author_ID7", { required: true })}
              className={`form-control ${errors.author_ID7 ? "is-invalid" : ""}`}
              id="author_ID7"
            />
            {errors.author_ID7 && (
              <div className="invalid-feedback">Author ID7 is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_ID8" className="form-label">
              Author ID8
            </label>
            <input
              type="text"
              {...register("author_ID8", { required: true })}
              className={`form-control ${errors.author_ID8 ? "is-invalid" : ""}`}
              id="author_ID8"
            />
            {errors.author_ID8 && (
              <div className="invalid-feedback">Author ID8 is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="author_ID9" className="form-label">
              Author ID9
            </label>
            <input
              type="text"
              {...register("author_ID9", { required: true })}
              className={`form-control ${errors.author_ID9 ? "is-invalid" : ""}`}
              id="author_ID9"
            />
            {errors.author_ID9 && (
              <div className="invalid-feedback">Author ID9 is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="author_ID10" className="form-label">
              Author ID10
            </label>
            <input
              type="text"
              {...register("author_ID10", { required: true })}
              className={`form-control ${
                errors.author_ID10 ? "is-invalid" : ""
              }`}
              id="author_ID10"
            />
            {errors.author_ID10 && (
              <div className="invalid-feedback">Author ID10 is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="dateOfSubmission" className="form-label">
              Date of Submission
            </label>
            <input
              type="date"
              {...register("dateOfSubmission", { required: true })}
              className={`form-control ${
                errors.dateOfSubmission ? "is-invalid" : ""
              }`}
              id="dateOfSubmission"
            />
            {errors.dateOfSubmission && (
              <div className="invalid-feedback">
                Date of Submission is required
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="dateOfPublication" className="form-label">
              Date of Publication
            </label>
            <input
              type="date"
              {...register("dateOfPublication", { required: true })}
              className={`form-control ${
                errors.dateOfPublication ? "is-invalid" : ""
              }`}
              id="dateOfPublication"
            />
            {errors.dateOfPublication && (
              <div className="invalid-feedback">
                Date of Publication is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="dateOfGranting" className="form-label">
              Date of Granting
            </label>
            <input
              type="date"
              {...register("dateOfGranting", { required: true })}
              className={`form-control ${
                errors.dateOfGranting ? "is-invalid" : ""
              }`}
              id="dateOfGranting"
            />
            {errors.dateOfGranting && (
              <div className="invalid-feedback">
                Date of Granting is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="foreign_" className="form-label">
              Foreign
            </label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="foreignYes"
                value="Y"
                {...register("foreign_", { required: true })}
                className={`form-check-input ${
                  errors.foreign_ ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="foreignYes" className="form-check-label">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="foreignNo"
                value="N"
                {...register("foreign_", { required: true })}
                className={`form-check-input ${
                  errors.foreign_ ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="foreignNo" className="form-check-label">
                No
              </label>
            </div>
            {errors.foreign_ && (
              <div className="invalid-feedback">
                Please select an option for Foreign
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="industry" className="form-label">
              Industry
            </label>
            <input
              type="text"
              {...register("industry", { required: true })}
              className={`form-control ${errors.industry ? "is-invalid" : ""}`}
              id="industry"
            />
            {errors.industry && (
              <div className="invalid-feedback">Industry is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="technology" className="form-label">
              Technology
            </label>
            <input
              type="text"
              {...register("technology", { required: true })}
              className={`form-control ${
                errors.technology ? "is-invalid" : ""
              }`}
              id="technology"
            />
            {errors.technology && (
              <div className="invalid-feedback">Technology is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="studentPresence" className="form-label">
              Student Presence
            </label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="studentPresenceYes"
                value="Y"
                {...register("studentPresence", { required: true })}
                className={`form-check-input ${
                  errors.studentPresence ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="studentPresenceYes" className="form-check-label">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="studentPresenceNo"
                value="N"
                {...register("studentPresence", { required: true })}
                className={`form-check-input ${
                  errors.studentPresence ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="studentPresenceNo" className="form-check-label">
                No
              </label>
            </div>
            {errors.studentPresence && (
              <div className="invalid-feedback">
                Please select an option for Student Presence
              </div>
            )}
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
              className={`form-control ${errors.domain ? "is-invalid" : ""}`}
              id="domain"
            />
            {errors.domain && (
              <div className="invalid-feedback">Domain is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="proof" className="form-label">
              Proof
            </label>
            <input
              type="file"
              {...register("proof", { required: true })}
              className={`form-control ${errors.proof ? "is-invalid" : ""}`}
              id="proof"
            />
            {errors.proof && (
              <div className="invalid-feedback">Proof is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="publisherName" className="form-label">
              Publisher Name
            </label>
            <input
              type="text"
              {...register("publisherName", { required: true })}
              className={`form-control ${
                errors.publisherName ? "is-invalid" : ""
              }`}
              id="publisherName"
            />
            {errors.publisherName && (
              <div className="invalid-feedback">Publisher Name is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="patentStatus" className="form-label">
              Patent Status
            </label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="patentStatusApproved"
                value="Approved"
                {...register("patentStatus", { required: true })}
                className={`form-check-input ${
                  errors.patentStatus ? "is-invalid" : ""
                }`}
              />
              <label
                htmlFor="patentStatusApproved"
                className="form-check-label"
              >
                Approved
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="patentStatusSubmitted"
                value="Submitted"
                {...register("patentStatus", { required: true })}
                className={`form-check-input ${
                  errors.patentStatus ? "is-invalid" : ""
                }`}
              />
              <label
                htmlFor="patentStatusSubmitted"
                className="form-check-label"
              >
                Submitted
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="patentStatusRejected"
                value="Rejected"
                {...register("patentStatus", { required: true })}
                className={`form-check-input ${
                  errors.patentStatus ? "is-invalid" : ""
                }`}
              />
              <label
                htmlFor="patentStatusRejected"
                className="form-check-label"
              >
                Rejected
              </label>
            </div>
            {errors.patentStatus && (
              <div className="invalid-feedback">
                Please select an option for Patent Status
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-success">
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

export default Patents;
