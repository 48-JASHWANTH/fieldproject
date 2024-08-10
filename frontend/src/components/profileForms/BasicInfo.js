import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forms.css";
import { axiosWithToken } from "../../axiosWithToken";
import { useNavigate } from "react-router-dom";

const BasicInfo = () => {
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
    //console.log(savedFormData)
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
    try {
      let res = await axiosWithToken.post(
        "http://localhost:5000/userApi/BasicInfo",
        data
      );
      //console.log(res.response.status);

      if (res.status === 200) {
        localStorage.setItem("lastCompletedForm", "1");
        alert("Data saved successfully...")
        navigate("/FacultyPage/CompleteProfile/Education");
      } 
    } catch (err) {
      alert("Form has already been saved...")
    }
  }

  return (
    <div className="container mt-5 shadow-lg p-3 mb-5 bg-white rounded">
      <h2 className="form-heading mb-4">Basic Details</h2>
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Gender --
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select State --
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Status --
              </option>
              <option value="Married">Married</option>
              <option value="Not married">Not married</option>
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Blood Group --
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Nationality --
              </option>
              <option value="Indian">Indian</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="Canadian">Canadian</option>
              <option value="Australian">Australian</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
              <option value="German">German</option>
              <option value="French">French</option>
              <option value="Italian">Italian</option>
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Religion --
              </option>
              <option value="Hinduism">Hinduism</option>
              <option value="Islam">Islam</option>
              <option value="Christianity">Christianity</option>
              <option value="Sikhism">Sikhism</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Jainism">Jainism</option>
              <option value="Zoroastrianism">Zoroastrianism</option>
              <option value="Judaism">Judaism</option>
              <option value="Bahá'í">Bahá'í</option>
              <option value="Other">Other</option>
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Caste --
              </option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
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
                className="form-check-input radiooInput"
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Type --
              </option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Shift --
              </option>
              <option value="Regular">Regular</option>
              <option value="Late">Late</option>
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Status --
              </option>
              <option value="Existing">Existing</option>
              <option value="Relieved">Relieved</option>
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
                className="form-check-input radiooInput"
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
                className="form-check-input radiooInput"
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
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Designation --
              </option>
              <option value="Assistant">Assistant</option>
              <option value="Associate">Associate</option>
              <option value="Professor">Professor</option>
            </select>
            {errors.faculty_designation && (
              <div className="invalid-feedback">Designation is required</div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfo;
