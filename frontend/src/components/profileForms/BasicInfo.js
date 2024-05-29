import React from "react";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css'

const BasicInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data){
    console.log(data);
  };

  return (
    <div className="container mt-5 shadow-lg p-3 mb-5 bg-white rounded">
      <h2 className="form-heading mb-4">BasicInfo</h2>
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
              <div className="invalid-feedback">Faculty name is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_displayname" className="form-label">
              Display Name
            </label>
            <input
              type="text"
              {...register("faculty_displayname", { required: true })}
              className={`form-control ${
                errors.faculty_displayname ? "is-invalid" : ""
              }`}
              id="faculty_displayname"
            />
            {errors.faculty_displayname && (
              <div className="invalid-feedback">Display name is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_email" className="form-label">
              Email
            </label>
            <input
              type="email"
              {...register("faculty_email", { required: true })}
              className={`form-control ${
                errors.faculty_email ? "is-invalid" : ""
              }`}
              id="faculty_email"
            />
            {errors.faculty_email && (
              <div className="invalid-feedback">Email is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_phno" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("faculty_phno", { required: true })}
              className={`form-control ${
                errors.faculty_phno ? "is-invalid" : ""
              }`}
              id="faculty_phno"
            />
            {errors.faculty_phno && (
              <div className="invalid-feedback">Phone number is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_phno1" className="form-label">
              Alternate Phone Number
            </label>
            <input
              type="tel"
              {...register("faculty_phno1")}
              className="form-control"
              id="faculty_phno1"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_econtact" className="form-label">
              Emergency Contact
            </label>
            <input
              type="tel"
              {...register("faculty_econtact")}
              className="form-control"
              id="faculty_econtact"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_gender" className="form-label">
              Gender
            </label>
            <select
              {...register("faculty_gender", { required: true })}
              className={`form-control ${
                errors.faculty_gender ? "is-invalid" : ""
              }`}
              id="faculty_gender"
            >
              <option value="">Select Gender</option>
              {/* Add options for gender */}
            </select>
            {errors.faculty_gender && (
              <div className="invalid-feedback">Gender is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("faculty_dob", { required: true })}
              className={`form-control ${
                errors.faculty_dob ? "is-invalid" : ""
              }`}
              id="faculty_dob"
            />
            {errors.faculty_dob && (
              <div className="invalid-feedback">Date of Birth is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_age" className="form-label">
              Age
            </label>
            <input
              type="number"
              {...register("faculty_age")}
              className="form-control"
              id="faculty_age"
              readOnly
            />
          </div>
          {/* Add calculated age based on date of birth */}
          <div className="col-md-4">
            <label htmlFor="faculty_placeOfBirth" className="form-label">
              Place of Birth
            </label>
            <input
              type="text"
              {...register("faculty_placeOfBirth")}
              className="form-control"
              id="faculty_placeOfBirth"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_dateOfRetirement" className="form-label">
              Date of Retirement
            </label>
            <input
              type="date"
              {...register("faculty_dateOfRetirement")}
              className="form-control"
              id="faculty_dateOfRetirement"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_state" className="form-label">
              State
            </label>
            <select
              {...register("faculty_state", { required: true })}
              className={`form-control ${
                errors.faculty_state ? "is-invalid" : ""
              }`}
              id="faculty_state"
            >
              <option value="">Select State</option>
              {/* Add options for state */}
            </select>
            {errors.faculty_state && (
              <div className="invalid-feedback">State is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_maritalStatus" className="form-label">
              Marital Status
            </label>
            <select
              {...register("faculty_maritalStatus", { required: true })}
              className={`form-control ${
                errors.faculty_maritalStatus ? "is-invalid" : ""
              }`}
              id="faculty_maritalStatus"
            >
              <option value="">Select Marital Status</option>
              {/* Add options for marital status */}
            </select>
            {errors.faculty_maritalStatus && (
              <div className="invalid-feedback">Marital status is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_bloodGroup" className="form-label">
              Blood Group
            </label>
            <select
              {...register("faculty_bloodGroup", { required: true })}
              className={`form-control ${
                errors.faculty_bloodGroup ? "is-invalid" : ""
              }`}
              id="faculty_bloodGroup"
            >
              <option value="">Select Blood Group</option>
              {/* Add options for blood group */}
            </select>
            {errors.faculty_bloodGroup && (
              <div className="invalid-feedback">Blood group is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_nationality" className="form-label">
              Nationality
            </label>
            <select
              {...register("faculty_nationality", { required: true })}
              className={`form-control ${
                errors.faculty_nationality ? "is-invalid" : ""
              }`}
              id="faculty_nationality"
            >
              <option value="">Select Nationality</option>
              {/* Add options for nationality */}
            </select>
            {errors.faculty_nationality && (
              <div className="invalid-feedback">Nationality is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_religion" className="form-label">
              Religion
            </label>
            <select
              {...register("faculty_religion", { required: true })}
              className={`form-control ${
                errors.faculty_religion ? "is-invalid" : ""
              }`}
              id="faculty_religion"
            >
              <option value="">Select Religion</option>
              {/* Add options for religion */}
            </select>
            {errors.faculty_religion && (
              <div className="invalid-feedback">Religion is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_caste" className="form-label">
              Caste
            </label>
            <select
              {...register("faculty_caste", { required: true })}
              className={`form-control ${
                errors.faculty_caste ? "is-invalid" : ""
              }`}
              id="faculty_caste"
            >
              <option value="">Select Caste</option>
              {/* Add options for caste */}
            </select>
            {errors.faculty_caste && (
              <div className="invalid-feedback">Caste is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_dateOfJoining" className="form-label">
              Date of Joining
            </label>
            <input
              type="date"
              {...register("faculty_dateOfJoining", { required: true })}
              className={`form-control ${
                errors.faculty_dateOfJoining ? "is-invalid" : ""
              }`}
              id="faculty_dateOfJoining"
            />
            {errors.faculty_dateOfJoining && (
              <div className="invalid-feedback">
                Date of Joining is required
              </div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_dateOfResignation" className="form-label">
              Date of Resignation
            </label>
            <input
              type="date"
              {...register("faculty_dateOfResignation")}
              className="form-control"
              id="faculty_dateOfResignation"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_address" className="form-label">
              Address
            </label>
            <textarea
              {...register("faculty_address", { required: true })}
              className={`form-control ${
                errors.faculty_address ? "is-invalid" : ""
              }`}
              id="faculty_address"
              rows="3"
            ></textarea>
            {errors.faculty_address && (
              <div className="invalid-feedback">Address is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Relieve Type</label>
            <div className="form-check">
              <input
                type="checkbox"
                {...register("faculty_relieveType")}
                className="form-check-input"
                id="faculty_relieveType"
              />
              <label className="form-check-label" htmlFor="faculty_relieveType">
                Relieved
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_relieveReason" className="form-label">
              Relieve Reason
            </label>
            <input
              type="text"
              {...register("faculty_relieveReason")}
              className="form-control"
              id="faculty_relieveReason"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_workLocation" className="form-label">
              Work Location
            </label>
            <input
              type="text"
              {...register("faculty_workLocation")}
              className="form-control"
              id="faculty_workLocation"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_dept" className="form-label">
              Department
            </label>
            <input
              type="text"
              {...register("faculty_dept", { required: true })}
              className={`form-control ${
                errors.faculty_dept ? "is-invalid" : ""
              }`}
              id="faculty_dept"
            />
            {errors.faculty_dept && (
              <div className="invalid-feedback">Department is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_manager1" className="form-label">
              Manager 1
            </label>
            <input
              type="text"
              {...register("faculty_manager1")}
              className="form-control"
              id="faculty_manager1"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_manager2" className="form-label">
              Manager 2
            </label>
            <input
              type="text"
              {...register("faculty_manager2")}
              className="form-control"
              id="faculty_manager2"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_empType" className="form-label">
              Employee Type
            </label>
            <select
              {...register("faculty_empType", { required: true })}
              className={`form-control ${
                errors.faculty_empType ? "is-invalid" : ""
              }`}
              id="faculty_empType"
            >
              <option value="">Select Employee Type</option>
              {/* Add options for employee type */}
            </select>
            {errors.faculty_empType && (
              <div className="invalid-feedback">Employee type is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_shift" className="form-label">
              Shift
            </label>
            <select
              {...register("faculty_shift", { required: true })}
              className={`form-control ${
                errors.faculty_shift ? "is-invalid" : ""
              }`}
              id="faculty_shift"
            >
              <option value="">Select Shift</option>
              {/* Add options for shift */}
            </select>
            {errors.faculty_shift && (
              <div className="invalid-feedback">Shift is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="faculty_status" className="form-label">
              Status
            </label>
            <select
              {...register("faculty_status", { required: true })}
              className={`form-control ${
                errors.faculty_status ? "is-invalid" : ""
              }`}
              id="faculty_status"
            >
              <option value="">Select Status</option>
              {/* Add options for status */}
            </select>
            {errors.faculty_status && (
              <div className="invalid-feedback">Status is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">PHC</label>
            <div className="form-check">
              <input
                type="checkbox"
                {...register("faculty_phc")}
                className="form-check-input"
                id="faculty_phc"
              />
              <label className="form-check-label" htmlFor="faculty_phc">
                Yes
              </label>
            </div>
            {/* Add conditional text input if PHC is checked */}
            {errors.faculty_phc && (
              <div className="invalid-feedback">PHC selection is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label className="form-label">Health Insurance</label>
            <div className="form-check">
              <input
                type="checkbox"
                {...register("faculty_healthInsurance")}
                className="form-check-input"
                id="faculty_healthInsurance"
              />
              <label
                className="form-check-label"
                htmlFor="faculty_healthInsurance"
              >
                Yes
              </label>
            </div>
            {errors.faculty_healthInsurance && (
              <div className="invalid-feedback">
                Health insurance selection is required
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="faculty_designation" className="form-label">
              Designation
            </label>
            <select
              {...register("faculty_designation", { required: true })}
              className={`form-control ${
                errors.faculty_designation ? "is-invalid" : ""
              }`}
              id="faculty_designation"
            >
              <option value="">Select Designation</option>
              {/* Add options for designation */}
            </select>
            {errors.faculty_designation && (
              <div className="invalid-feedback">Designation is required</div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfo;
